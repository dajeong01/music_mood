/** @jsxImportSource @emotion/react */
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import * as s from './styles';


function Footer() {
  return (
    <footer css={s.footer}>

      <div css={s.socialIcons}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      </div>

      <div css={s.contact}>
        <div>Email: info@melodyDiary.com</div>
        <div>Tel: 051-123-4567</div>
        <div>Address: 부산광역시 사하구 다대포해수욕장</div>
      </div>

      <div css={s.copyright}>
        &copy; melody_diary. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
