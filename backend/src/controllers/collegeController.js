import College from '../models/College.js';

// @desc    Get all active colleges (for dropdown & public list)
// @route   GET /api/colleges
// @access  Public
export const getColleges = async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = { isActive: true };

    if (search && search.trim()) {
      query.name = { $regex: search.trim(), $options: 'i' };
    }

    const colleges = await College.find(query).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: colleges.length,
      data: colleges,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get colleges with pagination & full admin control
// @route   GET /api/admin/colleges
// @access  Private (Admin)
export const getAdminColleges = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;

    const { search, status } = req.query;
    const query = {};

    if (status === 'active') query.isActive = true;
    if (status === 'inactive') query.isActive = false;

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { name: { $regex: term, $options: 'i' } },
        { city: { $regex: term, $options: 'i' } },
        { state: { $regex: term, $options: 'i' } },
      ];
    }

    const total = await College.countDocuments(query);
    const colleges = await College.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: colleges,
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

// @desc    Create new college
// @route   POST /api/admin/colleges
// @access  Private (Admin)
export const createCollege = async (req, res, next) => {
  try {
    const { name, city, state, country, description, website, isActive } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'College name is required',
      });
    }

    if (!city || !city.trim()) {
      return res.status(400).json({
        success: false,
        message: 'City is required',
      });
    }

    if (!state || !state.trim()) {
      return res.status(400).json({
        success: false,
        message: 'State is required',
      });
    }

    const existingCollege = await College.findOne({ name: name.trim() });
    if (existingCollege) {
      return res.status(400).json({
        success: false,
        message: 'A college with this name already exists',
      });
    }

    const college = await College.create({
      name: name.trim(),
      city: city.trim(),
      state: state.trim(),
      country: country ? country.trim() : 'India',
      description: (description || '').trim(),
      website: (website || '').trim(),
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      message: 'College created successfully',
      data: college,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update college
// @route   PATCH /api/admin/colleges/:id
// @access  Private (Admin)
export const updateCollege = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found',
      });
    }

    const fields = ['name', 'city', 'state', 'country', 'description', 'website', 'isActive'];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) {
        college[f] = req.body[f];
      }
    });

    const updated = await college.save();

    res.status(200).json({
      success: true,
      message: 'College updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete college
// @route   DELETE /api/admin/colleges/:id
// @access  Private (Admin)
export const deleteCollege = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found',
      });
    }

    await College.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'College deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
