import Newsletter from '../models/Newsletter.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    const existing = await Newsletter.findOne({ email: cleanEmail });

    if (existing) {
      if (existing.isActive) {
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed to our newsletter!',
          data: existing,
        });
      } else {
        existing.isActive = true;
        existing.subscribedAt = new Date();
        await existing.save();
        return res.status(200).json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
          data: existing,
        });
      }
    }

    const subscriber = await Newsletter.create({
      email: cleanEmail,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      data: subscriber,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get subscribers for Admin
// @route   GET /api/admin/newsletter
// @access  Private (Admin)
export const getSubscribers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;

    const { status, search } = req.query;
    const query = {};

    if (status === 'active') query.isActive = true;
    if (status === 'inactive') query.isActive = false;

    if (search && search.trim()) {
      query.email = { $regex: search.trim(), $options: 'i' };
    }

    const total = await Newsletter.countDocuments(query);
    const subscribers = await Newsletter.find(query)
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: subscribers,
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

// @desc    Update subscriber status (activate/deactivate)
// @route   PATCH /api/admin/newsletter/:id
// @access  Private (Admin)
export const updateSubscriber = async (req, res, next) => {
  try {
    const { isActive } = req.body;
    const subscriber = await Newsletter.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found',
      });
    }

    if (isActive !== undefined) {
      subscriber.isActive = isActive;
    }

    await subscriber.save();

    res.status(200).json({
      success: true,
      message: `Subscriber status updated to ${subscriber.isActive ? 'active' : 'inactive'}`,
      data: subscriber,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete subscriber
// @route   DELETE /api/admin/newsletter/:id
// @access  Private (Admin)
export const deleteSubscriber = async (req, res, next) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subscriber deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
