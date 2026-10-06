import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import College from '../models/College.js';
import Course from '../models/Course.js';
import Lead from '../models/Lead.js';
import Contact from '../models/Contact.js';
import Newsletter from '../models/Newsletter.js';

dotenv.config();

const collegesData = [
  { name: 'M S Ramaiah Medical College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Kempegowda Institute of Medical Sciences, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Vydehi Institute of Medical Sciences And Research Centre, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'A J Institute of Medical Sciences, Mangalore', city: 'Mangalore', state: 'Karnataka' },
  { name: 'Saptagiri Institute of Medical Sciences, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'B G S Global Institute of Medical Sciences, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Srinivas Institute of Medical Sciences and Research Centre, Mangalore', city: 'Mangalore', state: 'Karnataka' },
  { name: 'Akash Institute of Medical Sciences and Research Centre, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: "St. Joseph's University, Bengaluru", city: 'Bengaluru', state: 'Karnataka' },
  { name: "St. Joseph's College of Commerce, Bengaluru", city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Christ University, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Mount Carmel College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Jyoti Nivas College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Maharani Lakshmi Ammanni College for Women, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'NMKRV College for Women, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'B.M.S. College for Women, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Seshadripuram College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Seshadripuram First Grade College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: "KLE Society's S. Nijalingappa College, Bengaluru", city: 'Bengaluru', state: 'Karnataka' },
  { name: 'MES College of Arts, Science and Commerce, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'M.S. Ramaiah College of Arts, Science and Commerce, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Vijaya College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'National College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Sivanath Sastri College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'SJR College for Women, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'R.B.A.N.M.S. First Grade College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Reddy Jana Sangha First Grade College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'VET First Grade College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Hasnath College for Women, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Sri Bhagawan Mahaveer Jain College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Presidency College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Kristu Jayanti College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'M.S. Ramaiah College of Hotel Management, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Acharya Bangalore B-School, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Acharya Institute of Graduate Studies, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Garden City College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'St. Claret College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Surana College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Kristu Jayanti College of Law, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: "KLE Society's Law College, Bengaluru", city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Bangalore Institute of Legal Studies, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'M.S. Ramaiah College of Law, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'University Law College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'St. Francis College, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Jyothi Nivas College Autonomous, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'The Oxford College of Science, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: "Maharani's Science College for Women, Bengaluru", city: 'Bengaluru', state: 'Karnataka' },
  { name: 'S.B. College of Management Studies, Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
];

const coursesData = [
  // Arts & Humanities
  { name: 'B.A - Bachelor of Arts', category: 'Arts', duration: '3 Years', code: 'BA-01' },
  { name: 'B.A - English', category: 'Arts', duration: '3 Years', code: 'BA-ENG' },
  { name: 'B.A - Economics', category: 'Arts', duration: '3 Years', code: 'BA-ECO' },
  { name: 'B.A - Psychology', category: 'Arts', duration: '3 Years', code: 'BA-PSY' },
  { name: 'B.A - Sociology', category: 'Arts', duration: '3 Years', code: 'BA-SOC' },
  { name: 'B.A - Political Science', category: 'Arts', duration: '3 Years', code: 'BA-POL' },
  { name: 'B.A - History', category: 'Arts', duration: '3 Years', code: 'BA-HIS' },
  { name: 'B.A - Journalism and Mass Communication', category: 'Arts', duration: '3 Years', code: 'BA-JMC' },

  // Commerce & Finance
  { name: 'B.Com - Bachelor of Commerce', category: 'Commerce', duration: '3 Years', code: 'BCOM-01' },
  { name: 'B.Com - Accounting and Finance', category: 'Commerce', duration: '3 Years', code: 'BCOM-AF' },
  { name: 'B.Com - Banking and Finance', category: 'Commerce', duration: '3 Years', code: 'BCOM-BF' },
  { name: 'B.Com - Computer Applications', category: 'Commerce', duration: '3 Years', code: 'BCOM-CA' },
  { name: 'B.Com - International Business', category: 'Commerce', duration: '3 Years', code: 'BCOM-IB' },
  { name: 'B.Com - Taxation', category: 'Commerce', duration: '3 Years', code: 'BCOM-TAX' },

  // Business & Management
  { name: 'BBA - Bachelor of Business Administration', category: 'Management', duration: '3 Years', code: 'BBA-01' },
  { name: 'BBA - Finance', category: 'Management', duration: '3 Years', code: 'BBA-FIN' },
  { name: 'BBA - Marketing', category: 'Management', duration: '3 Years', code: 'BBA-MKT' },
  { name: 'BBA - Human Resource Management', category: 'Management', duration: '3 Years', code: 'BBA-HR' },
  { name: 'BBA - International Business', category: 'Management', duration: '3 Years', code: 'BBA-IB' },
  { name: 'BBA - Business Analytics', category: 'Management', duration: '3 Years', code: 'BBA-BA' },

  // Computer Applications & IT
  { name: 'BCA - Bachelor of Computer Applications', category: 'Computer Science & IT', duration: '3 Years', code: 'BCA-01' },
  { name: 'BCA - Data Science', category: 'Computer Science & IT', duration: '3 Years', code: 'BCA-DS' },
  { name: 'BCA - Artificial Intelligence', category: 'Computer Science & IT', duration: '3 Years', code: 'BCA-AI' },
  { name: 'BCA - Cyber Security', category: 'Computer Science & IT', duration: '3 Years', code: 'BCA-CS' },
  { name: 'BCA - Cloud Computing', category: 'Computer Science & IT', duration: '3 Years', code: 'BCA-CC' },
  { name: 'BCA - Data Analytics', category: 'Computer Science & IT', duration: '3 Years', code: 'BCA-DA' },

  // Science
  { name: 'B.Sc - Computer Science', category: 'Science', duration: '3 Years', code: 'BSC-CS' },
  { name: 'B.Sc - Information Technology', category: 'Science', duration: '3 Years', code: 'BSC-IT' },
  { name: 'B.Sc - Data Science', category: 'Science', duration: '3 Years', code: 'BSC-DS' },
  { name: 'B.Sc - Artificial Intelligence', category: 'Science', duration: '3 Years', code: 'BSC-AI' },
  { name: 'B.Sc - Cyber Security', category: 'Science', duration: '3 Years', code: 'BSC-CYBER' },
  { name: 'B.Sc - Mathematics', category: 'Science', duration: '3 Years', code: 'BSC-MATH' },
  { name: 'B.Sc - Physics', category: 'Science', duration: '3 Years', code: 'BSC-PHY' },
  { name: 'B.Sc - Chemistry', category: 'Science', duration: '3 Years', code: 'BSC-CHEM' },
  { name: 'B.Sc - Biology', category: 'Science', duration: '3 Years', code: 'BSC-BIO' },
  { name: 'B.Sc - Biotechnology', category: 'Science', duration: '3 Years', code: 'BSC-BIOTECH' },
  { name: 'B.Sc - Microbiology', category: 'Science', duration: '3 Years', code: 'BSC-MICRO' },
  { name: 'B.Sc - Biochemistry', category: 'Science', duration: '3 Years', code: 'BSC-BIOCHEM' },
  { name: 'B.Sc - Statistics', category: 'Science', duration: '3 Years', code: 'BSC-STAT' },
  { name: 'B.Sc - Electronics', category: 'Science', duration: '3 Years', code: 'BSC-ELEC' },
  { name: 'B.Sc - Botany', category: 'Science', duration: '3 Years', code: 'BSC-BOT' },
  { name: 'B.Sc - Zoology', category: 'Science', duration: '3 Years', code: 'BSC-ZOO' },
  { name: 'B.Sc - Bioinformatics', category: 'Science', duration: '3 Years', code: 'BSC-BINFO' },
  { name: 'B.Sc - Environmental Science', category: 'Science', duration: '3 Years', code: 'BSC-ENV' },
  { name: 'B.Sc - Food Technology', category: 'Science', duration: '3 Years', code: 'BSC-FOOD' },
  { name: 'B.Sc - Forensic Science', category: 'Science', duration: '3 Years', code: 'BSC-FORENSIC' },

  // Engineering & Technology
  { name: 'B.Tech - Computer Science and Engineering', category: 'Engineering', duration: '4 Years', code: 'BTECH-CSE' },
  { name: 'B.Tech - Artificial Intelligence', category: 'Engineering', duration: '4 Years', code: 'BTECH-AI' },
  { name: 'B.Tech - Artificial Intelligence and Machine Learning', category: 'Engineering', duration: '4 Years', code: 'BTECH-AIML' },
  { name: 'B.Tech - Information Technology', category: 'Engineering', duration: '4 Years', code: 'BTECH-IT' },
  { name: 'B.Tech - Data Science', category: 'Engineering', duration: '4 Years', code: 'BTECH-DS' },
  { name: 'B.Tech - Cyber Security', category: 'Engineering', duration: '4 Years', code: 'BTECH-CS' },
  { name: 'B.Tech - Electronics and Communication Engineering', category: 'Engineering', duration: '4 Years', code: 'BTECH-ECE' },
  { name: 'B.Tech - Electrical and Electronics Engineering', category: 'Engineering', duration: '4 Years', code: 'BTECH-EEE' },
  { name: 'B.Tech - Mechanical Engineering', category: 'Engineering', duration: '4 Years', code: 'BTECH-MECH' },
  { name: 'B.Tech - Civil Engineering', category: 'Engineering', duration: '4 Years', code: 'BTECH-CIVIL' },
  { name: 'B.Tech - Aerospace Engineering', category: 'Engineering', duration: '4 Years', code: 'BTECH-AERO' },
  { name: 'B.Tech - Biotechnology', category: 'Engineering', duration: '4 Years', code: 'BTECH-BIO' },
  { name: 'B.Tech - Chemical Engineering', category: 'Engineering', duration: '4 Years', code: 'BTECH-CHEM' },
  { name: 'B.Tech - Automobile Engineering', category: 'Engineering', duration: '4 Years', code: 'BTECH-AUTO' },
  { name: 'B.Tech - Robotics and Automation', category: 'Engineering', duration: '4 Years', code: 'BTECH-ROBOT' },
  { name: 'B.Tech - Internet of Things', category: 'Engineering', duration: '4 Years', code: 'BTECH-IOT' },
  { name: 'B.E - Computer Science and Engineering', category: 'Engineering', duration: '4 Years', code: 'BE-CSE' },
  { name: 'B.E - Information Science and Engineering', category: 'Engineering', duration: '4 Years', code: 'BE-ISE' },
  { name: 'B.E - Electronics and Communication Engineering', category: 'Engineering', duration: '4 Years', code: 'BE-ECE' },
  { name: 'B.E - Mechanical Engineering', category: 'Engineering', duration: '4 Years', code: 'BE-MECH' },
  { name: 'B.E - Civil Engineering', category: 'Engineering', duration: '4 Years', code: 'BE-CIVIL' },
  { name: 'B.E - Electrical and Electronics Engineering', category: 'Engineering', duration: '4 Years', code: 'BE-EEE' },

  // Medical & Healthcare
  { name: 'MBBS - Bachelor of Medicine and Bachelor of Surgery', category: 'Medical', duration: '5.5 Years', code: 'MBBS' },
  { name: 'BDS - Bachelor of Dental Surgery', category: 'Medical', duration: '5 Years', code: 'BDS' },
  { name: 'BAMS - Bachelor of Ayurvedic Medicine and Surgery', category: 'Medical', duration: '5.5 Years', code: 'BAMS' },
  { name: 'BHMS - Bachelor of Homeopathic Medicine and Surgery', category: 'Medical', duration: '5.5 Years', code: 'BHMS' },
  { name: 'BUMS - Bachelor of Unani Medicine and Surgery', category: 'Medical', duration: '5.5 Years', code: 'BUMS' },
  { name: 'BNYS - Bachelor of Naturopathy and Yogic Sciences', category: 'Medical', duration: '5.5 Years', code: 'BNYS' },
  { name: 'B.Sc - Nursing', category: 'Healthcare', duration: '4 Years', code: 'BSC-NURS' },
  { name: 'B.Pharm - Bachelor of Pharmacy', category: 'Pharmacy', duration: '4 Years', code: 'BPHARM' },
  { name: 'Pharm.D - Doctor of Pharmacy', category: 'Pharmacy', duration: '6 Years', code: 'PHARMD' },
  { name: 'BPT - Bachelor of Physiotherapy', category: 'Healthcare', duration: '4.5 Years', code: 'BPT' },
  { name: 'BMLT - Bachelor of Medical Laboratory Technology', category: 'Healthcare', duration: '3 Years', code: 'BMLT' },

  // Law
  { name: 'LL.B - Bachelor of Laws', category: 'Law', duration: '3 Years', code: 'LLB' },
  { name: 'B.A LL.B - Bachelor of Arts and Bachelor of Laws', category: 'Law', duration: '5 Years', code: 'BALLB' },
  { name: 'BBA LL.B - Bachelor of Business Administration and Bachelor of Laws', category: 'Law', duration: '5 Years', code: 'BBALLB' },
  { name: 'B.Com LL.B - Bachelor of Commerce and Bachelor of Laws', category: 'Law', duration: '5 Years', code: 'BCOMLLB' },

  // Design, Media & Others
  { name: 'B.Des - Bachelor of Design', category: 'Design', duration: '4 Years', code: 'BDES' },
  { name: 'B.Arch - Bachelor of Architecture', category: 'Architecture', duration: '5 Years', code: 'BARCH' },
  { name: 'B.Plan - Bachelor of Planning', category: 'Architecture', duration: '4 Years', code: 'BPLAN' },
  { name: 'BFA - Bachelor of Fine Arts', category: 'Arts', duration: '4 Years', code: 'BFA' },
  { name: 'BHM - Bachelor of Hotel Management', category: 'Hospitality', duration: '4 Years', code: 'BHM' },
  { name: 'BTTM - Bachelor of Travel and Tourism Management', category: 'Hospitality', duration: '4 Years', code: 'BTTM' },
  { name: 'BJMC - Bachelor of Journalism and Mass Communication', category: 'Media', duration: '3 Years', code: 'BJMC' },
  { name: 'BSW - Bachelor of Social Work', category: 'Social Work', duration: '3 Years', code: 'BSW' },
  { name: 'B.Lib.I.Sc - Bachelor of Library and Information Science', category: 'Others', duration: '1 Year', code: 'BLIB' },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/education_consultancy';
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB for seeding: ${mongoUri}`);

    // 1. Seed Admin
    console.log('Seeding Admins...');
    const adminEmail = (process.env.ADMIN_EMAIL || 'crcnitrox@gmail.com').trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Hamja123';

    // Check whether an admin already exists
    let admin = await Admin.findOne({
      $or: [{ email: adminEmail }, { role: 'admin' }],
    });

    if (admin) {
      console.log(`Updating existing admin account (${admin.email} -> ${adminEmail})...`);
      admin.name = 'AVP Global Education Admin';
      admin.email = adminEmail;
      admin.password = adminPassword; // Triggers pre('save') bcrypt hashing
      admin.role = 'admin';
      admin.isActive = true;
      await admin.save();
    } else {
      console.log(`Creating initial admin account (${adminEmail})...`);
      admin = new Admin({
        name: 'AVP Global Education Admin',
        email: adminEmail,
        password: adminPassword, // Triggers pre('save') bcrypt hashing
        role: 'admin',
        isActive: true,
      });
      await admin.save();
    }

    // Ensure no duplicate admin accounts remain
    await Admin.deleteMany({
      role: 'admin',
      _id: { $ne: admin._id },
    });

    // Manager / Counselor
    const managerEmail = (process.env.MANAGER_EMAIL || 'manager@education.com').trim().toLowerCase();
    let manager = await Admin.findOne({ email: managerEmail });
    if (!manager) {
      manager = new Admin({
        name: 'Admissions Counselor',
        email: managerEmail,
        password: process.env.MANAGER_PASSWORD || 'ManagerPassword123!',
        role: 'manager',
        isActive: true,
      });
      await manager.save();
    }
    console.log('Admins seeded successfully.');

    // 2. Seed Colleges
    console.log('Seeding Colleges...');
    await College.deleteMany({});
    const createdColleges = await College.insertMany(collegesData);
    console.log(`Seeded ${createdColleges.length} colleges.`);

    // 3. Seed Courses
    console.log('Seeding Courses...');
    await Course.deleteMany({});
    const coursesToInsert = coursesData.map((c) => ({
      ...c,
      college: 'All Colleges',
      isActive: true,
    }));
    const createdCourses = await Course.insertMany(coursesToInsert);
    console.log(`Seeded ${createdCourses.length} courses.`);

    // 4. Seed Initial Sample Leads
    console.log('Seeding Sample Leads...');
    await Lead.deleteMany({});
    const sampleLeads = [
      {
        firstName: 'Rahul',
        lastName: 'Sharma',
        email: 'rahul.sharma@example.com',
        phone: '+91 9876543210',
        address: { street: '12 Brigade Road', city: 'Bengaluru', state: 'Karnataka', postalCode: '560001' },
        college: "Christ University, Bengaluru",
        course: 'BCA - Bachelor of Computer Applications',
        contactPermission: true,
        status: 'new',
        assignedTo: 'Admissions Counselor',
        notes: [{ text: 'Expressed interest in artificial intelligence track.', author: 'Admissions Counselor' }],
      },
      {
        firstName: 'Priya',
        lastName: 'Patel',
        email: 'priya.patel@example.com',
        phone: '+91 9823456789',
        address: { street: '45 MG Road', city: 'Ahmedabad', state: 'Gujarat', postalCode: '380001' },
        college: 'M S Ramaiah Medical College, Bengaluru',
        course: 'MBBS - Bachelor of Medicine and Bachelor of Surgery',
        contactPermission: true,
        status: 'interested',
        assignedTo: 'System Administrator',
        notes: [{ text: 'Scored 620 in NEET, scheduled counseling session.', author: 'System Administrator' }],
      },
      {
        firstName: 'Arjun',
        lastName: 'Nair',
        email: 'arjun.nair@example.com',
        phone: '+91 9445123456',
        address: { street: '78 Marine Drive', city: 'Kochi', state: 'Kerala', postalCode: '682001' },
        college: "St. Joseph's University, Bengaluru",
        course: 'B.Tech - Computer Science and Engineering',
        contactPermission: true,
        status: 'contacted',
        assignedTo: 'Admissions Counselor',
        notes: [{ text: 'Called student. Interested in hostel facility information.', author: 'Admissions Counselor' }],
      },
      {
        firstName: 'Ananya',
        lastName: 'Das',
        email: 'ananya.das@example.com',
        phone: '+91 9123456780',
        address: { street: '22 Park Street', city: 'Kolkata', state: 'West Bengal', postalCode: '700016' },
        college: 'Mount Carmel College, Bengaluru',
        course: 'B.Com - Accounting and Finance',
        contactPermission: true,
        status: 'application',
        assignedTo: 'Admissions Counselor',
        notes: [{ text: 'Application form submitted. Awaiting 12th marksheet verification.', author: 'Admissions Counselor' }],
      },
      {
        firstName: 'Rohan',
        lastName: 'Verma',
        email: 'rohan.verma@example.com',
        phone: '+91 9711223344',
        address: { street: '10 Connaught Place', city: 'New Delhi', state: 'Delhi', postalCode: '110001' },
        college: 'Presidency College, Bengaluru',
        course: 'BBA - Business Analytics',
        contactPermission: true,
        status: 'admitted',
        assignedTo: 'System Administrator',
        notes: [{ text: 'Admission finalized. Fee deposit completed.', author: 'System Administrator' }],
      },
      {
        firstName: 'Sneha',
        lastName: 'Kulkarni',
        email: 'sneha.kulkarni@example.com',
        phone: '+91 9655443322',
        address: { street: '88 FC Road', city: 'Pune', state: 'Maharashtra', postalCode: '411004' },
        college: "KLE Society's Law College, Bengaluru",
        course: 'B.A LL.B - Bachelor of Arts and Bachelor of Laws',
        contactPermission: true,
        status: 'follow-up',
        assignedTo: 'Admissions Counselor',
        notes: [{ text: 'Requested brochure and scholarship criteria.', author: 'Admissions Counselor' }],
      },
    ];
    await Lead.insertMany(sampleLeads);
    console.log(`Seeded ${sampleLeads.length} sample leads.`);

    // 5. Seed Contacts
    console.log('Seeding Sample Contacts...');
    await Contact.deleteMany({});
    await Contact.insertMany([
      {
        name: 'Kavita Menon',
        email: 'kavita.m@example.com',
        phone: '+91 9888777666',
        subject: 'NRI Quota Admission Query',
        message: 'Hello, I want to inquire about admission for my son for the B.Tech CSE 2026 intake under NRI quota.',
        status: 'unread',
      },
      {
        name: 'Vikram Joshi',
        email: 'vikram.joshi@example.com',
        phone: '+91 9777666555',
        subject: 'Scholarship Details',
        message: 'Could you please email me the complete list of merit scholarships available for B.Com candidates?',
        status: 'read',
      },
    ]);
    console.log('Seeded sample contacts.');

    // 6. Seed Newsletter
    console.log('Seeding Newsletter Subscribers...');
    await Newsletter.deleteMany({});
    await Newsletter.insertMany([
      { email: 'student1@example.com', isActive: true },
      { email: 'parent.guidance@example.com', isActive: true },
      { email: 'career.aspirant@example.com', isActive: true },
    ]);
    console.log('Seeded newsletter subscribers.');

    console.log('\n========================================');
    console.log('DATABASE SEEDED SUCCESSFULLY!');
    console.log(`Admin Email: ${adminEmail}`);
    console.log('Admin Password: [CONFIGURED IN ENVIRONMENT]');
    console.log(`Manager Email: ${managerEmail}`);
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
