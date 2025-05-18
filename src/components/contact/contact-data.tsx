import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MarkunreadMailboxOutlinedIcon from "@mui/icons-material/MarkunreadMailboxOutlined";

export const contactInfo = [
  {
    id: 1,
    icon: <LocalPhoneOutlinedIcon />,
    text: "۰-۰۰ ۰۰۰ ۰۰۰۰",
  },
  {
    id: 2,
    icon: <LocalPhoneOutlinedIcon />,
    text: "۰-۰۰ ۰۰۰ ۰۰۰۰",
  },
  {
    id: 3,
    icon: <EmailOutlinedIcon />,
    text: "support@gmail.com",
  },
  {
    id: 4,
    icon: <AccessTimeOutlinedIcon />,
    text: (
      <>
        برای تحویل طلا، حداقل یک روز قبل درخواست خود را از طریق منو دریافت طلا
        ثبت نمایید. <br />
        شنبه تا چهارشنبه ۱۰ تا ۱۸ <br />
        پنجشنبه ۱۰ تا ۱۴ <br />
        (به جز ایام تعطیل)
      </>
    ),
  },
  {
    id: 5,
    icon: <FmdGoodOutlinedIcon />,
    text: "آدرس دفتر فنی: تهران، دانشگاه صنعتی شریف، مرکز نوآوری شهید ستاری، طبقه پنجم، واحد ۵۲۳",
  },
  {
    id: 6,
    icon: <FmdGoodOutlinedIcon />,
    text: "آدرس طلافروشی: تهران، خیابان ستارخان، تقاطع صادق پور، پاساژ الماس غرب، طبقه منفی یک، واحد ۱۵",
  },
  {
    id: 7,
    icon: <MarkunreadMailboxOutlinedIcon />,
    text: "۱۴۵۸۸۸۹۵۹۵",
  },
];

export default contactInfo;
