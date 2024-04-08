function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <h1>Check our social media :</h1>
      <div>
        <a>
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a>
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a>
          <i className="fa-brands fa-tiktok"></i>
        </a>
      </div>
      <p>Copyright©{currentYear}</p>
    </div>
  );
}

export default Footer;
