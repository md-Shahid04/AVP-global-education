import Lead from '../models/Lead.js';
import { validateLeadInput } from '../validators/leadValidator.js';

// @desc    Submit new lead (public request info form)
// @route   POST /api/leads
// @access  Public
export const createLead = async (req, res, next) => {
  try {
    const { isValid, errors, sanitized } = validateLeadInput(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields correctly',
        errors,
      });
    }

    // Duplicate prevention: check if enquiry with same email + course or phone + course in last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingDuplicate = await Lead.findOne({
      $or: [
        { email: sanitized.email, course: sanitized.course },
        { phone: sanitized.phone, course: sanitized.course },
      ],
      createdAt: { $gte: oneDayAgo },
    });

    if (existingDuplicate) {
      return res.status(200).json({
        success: true,
        isDuplicate: true,
        message:
          'Thank you! We already have your enquiry on file for this course. Our academic counselor will contact you shortly.',
        data: {
          id: existingDuplicate._id,
          firstName: existingDuplicate.firstName,
          course: existingDuplicate.course,
          status: existingDuplicate.status,
        },
      });
    }

    const newLead = await Lead.create({
      ...sanitized,
      status: 'new',
      source: req.body.source || 'website_form',
    });

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted successfully! An admissions counselor will get in touch with you.',
      data: newLead,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all leads with search, filters, pagination
// @route   GET /api/admin/leads
// @access  Private (Admin)
export const getLeads = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;

    const { search, status, college, course, sortBy, sortOrder } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (college && college !== 'all') {
      query.college = college;
    }

    if (course && course !== 'all') {
      query.course = course;
    }

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { firstName: { $regex: term, $options: 'i' } },
        { lastName: { $regex: term, $options: 'i' } },
        { email: { $regex: term, $options: 'i' } },
        { phone: { $regex: term, $options: 'i' } },
        { 'address.city': { $regex: term, $options: 'i' } },
      ];
    }

    const sortField = sortBy || 'createdAt';
    const sortDirection = sortOrder === 'asc' ? 1 : -1;
    const sort = { [sortField]: sortDirection };

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single lead details
// @route   GET /api/admin/leads/:id
// @access  Private (Admin)
export const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update lead details
// @route   PATCH /api/admin/leads/:id
// @access  Private (Admin)
export const updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    const allowedUpdates = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'college',
      'course',
      'status',
      'assignedTo',
      'contactPermission',
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        lead[field] = req.body[field];
      }
    });

    if (req.body.newNote && req.body.newNote.trim()) {
      lead.notes.push({
        text: req.body.newNote.trim(),
        author: req.admin?.name || 'Admin',
        createdAt: new Date(),
      });
    }

    const updatedLead = await lead.save();

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: updatedLead,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update lead status only
// @route   PATCH /api/admin/leads/:id/status
// @access  Private (Admin)
export const updateLeadStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;

    const validStatuses = [
      'new',
      'contacted',
      'follow-up',
      'interested',
      'application',
      'admitted',
      'rejected',
      'closed',
    ];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid options are: ${validStatuses.join(', ')}`,
      });
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    const oldStatus = lead.status;
    lead.status = status;

    // Auto-append status change log note
    lead.notes.push({
      text: note || `Status changed from "${oldStatus}" to "${status}"`,
      author: req.admin?.name || 'Admin',
      createdAt: new Date(),
    });

    const updatedLead = await lead.save();

    res.status(200).json({
      success: true,
      message: `Lead status updated to ${status}`,
      data: updatedLead,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add note to a lead
// @route   POST /api/admin/leads/:id/notes
// @access  Private (Admin)
export const addLeadNote = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Note text cannot be empty',
      });
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    lead.notes.push({
      text: text.trim(),
      author: req.admin?.name || 'Admin',
      createdAt: new Date(),
    });

    await lead.save();

    res.status(200).json({
      success: true,
      message: 'Note added successfully',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete lead
// @route   DELETE /api/admin/leads/:id
// @access  Private (Admin)
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Lead removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
