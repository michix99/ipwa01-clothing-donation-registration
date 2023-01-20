import './Footer.scss';

function Footer() {
  return (
    <div id="footer-wrapper" className="fixed-bottom text-center p-3">
      &copy; {new Date().getFullYear()} Copyright:{' '}
      <a className="text-dark" href="https://github.com/michix99">
        michix99
      </a>
    </div>
  );
}

export default Footer;
