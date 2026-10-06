import Course from '../models/Course.js';

// @desc    Get courses (supports filtering by college or category)
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res, next) => {
  try {
    const { college, collegeId, category, search } = req.query;
    const query = { isActive: true };

    const collegeParam = college || collegeId;
    if (collegeParam && collegeParam !== 'all') {
      // Return courses belonging to this college OR courses common to all colleges
      query.$or = [
        { college: collegeParam },
        { college: 'All Colleges' },
        { college: { $exists: false } },
        { college: '' },
      ];
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search && search.trim()) {
      query.name = { $regex: search.trim(), $options: 'i' };
    }

    const courses = await Course.find(query).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get courses with pagination for Admin
// @route   GET /api/admin/courses
// @access  Private (Admin)
export const getAdminCourses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;

    const { search, college, category, status } = req.query;
    const query = {};

    if (status === 'active') query.isActive = true;
    if (status === 'inactive') query.isActive = false;

    if (college && college !== 'all') {
      query.college = college;
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { name: { $regex: term, $options: 'i' } },
        { code: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } },
      ];
    }

    const total = await Course.countDocuments(query);
    const courses = await Course.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: courses,
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

// @desc    Create course
// @route   POST /api/admin/courses
// @access  Private (Admin)
export const createCourse = async (req, res, next) => {
  try {
    const { name, code, description, duration, college, category, isActive } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Course name is required',
      });
    }

    const course = await Course.create({
      name: name.trim(),
      code: (code || '').trim(),
      description: (description || '').trim(),
      duration: (duration || '3 Years').trim(),
      college: (college || 'All Colleges').trim(),
      category: (category || 'General').trim(),
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update course
// @route   PATCH /api/admin/courses/:id
// @access  Private (Admin)
export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const fields = ['name', 'code', 'description', 'duration', 'college', 'category', 'isActive'];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) {
        course[f] = req.body[f];
      }
    });

    const updated = await course.save();

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete course
// @route   DELETE /api/admin/courses/:id
// @access  Private (Admin)
export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
