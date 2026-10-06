import Header from '../components/Header';
import Footer from '../components/Footer';

const PublicLayout = ({ children }) => {
  return (
    <div className="public-layout-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
