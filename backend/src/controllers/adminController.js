import Lead from '../models/Lead.js';
import College from '../models/College.js';
import Course from '../models/Course.js';
import Contact from '../models/Contact.js';
import Newsletter from '../models/Newsletter.js';

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/dashboard/stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalLeads,
      newLeads,
      contactedLeads,
      followUpLeads,
      interestedLeads,
      applicationLeads,
      admittedLeads,
      rejectedLeads,
      closedLeads,
      totalColleges,
      totalCourses,
      unreadContacts,
      totalSubscribers,
      recentLeads,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'new' }),
      Lead.countDocuments({ status: 'contacted' }),
      Lead.countDocuments({ status: 'follow-up' }),
      Lead.countDocuments({ status: 'interested' }),
      Lead.countDocuments({ status: 'application' }),
      Lead.countDocuments({ status: 'admitted' }),
      Lead.countDocuments({ status: 'rejected' }),
      Lead.countDocuments({ status: 'closed' }),
      College.countDocuments({ isActive: true }),
      Course.countDocuments({ isActive: true }),
      Contact.countDocuments({ status: 'unread' }),
      Newsletter.countDocuments({ isActive: true }),
      Lead.find().sort({ createdAt: -1 }).limit(6),
    ]);

    // Trend by month/day for graph
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const leadsByDate = await Lead.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          total: totalLeads,
          new: newLeads,
          contacted: contactedLeads,
          followUp: followUpLeads,
          interested: interestedLeads,
          application: applicationLeads,
          admitted: admittedLeads,
          rejected: rejectedLeads,
          closed: closedLeads,
          colleges: totalColleges,
          courses: totalCourses,
          unreadContacts,
          subscribers: totalSubscribers,
        },
        recentLeads,
        leadsByDate,
      },
    });
  } catch (error) {
    next(error);
  }
};
