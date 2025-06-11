import { CiUser } from "react-icons/ci";
import { RiBookReadLine  } from "react-icons/ri";
import { MdOutlineFeedback  } from "react-icons/md";
import { BsEnvelopeAt  } from "react-icons/bs";

export const navItems = [
  { name: "About", link: "#about", icon: CiUser },
  { name: "Projects", link: "#projects", icon: RiBookReadLine },
  { name: "Testimonials", link: "#testimonials", icon: MdOutlineFeedback  },
  { name: "Contact", link: "#contact", icon: BsEnvelopeAt  },
];

export const gridItems = [
  {
    id: 1,
    title: "Innovate & Integrate",
    description: "We aim to deliver cutting-edge solutions tailored to our clients' needs, encompassing software development, API integrations & creative design",
    className: "lg:col-span-3 md:col-span-3 md:row-span-1",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-3 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Calculate.ng",
    des: "Your comprehensive Nigerian calculator suite featuring BMI, Tax, and Inflation calculators. Simplifying complex calculations for everyday Nigerians.",
    img: "/calculate.png",
    iconLists: ["/re.svg", "/next.svg", "/tail.svg", "/ts.svg", "/fm.svg"],
    link: "https://calculate.ng/",
  },
  {
    id: 2,
    title: "Capp.to",
    des: "The ultimate modern URL shortener with instant QR code generation!  Simplify your links and track clicks with ease.",
    img: "/capp.png",
    iconLists: ["/nodejs.svg", "/next.svg", "/tail.svg", "/ts.svg"],
    link: "https://capp.to/",
  },
  {
    id: 3,
    title: "Zentry Animated Landing Page",
    des: "A landing page for Zentry, a web3 project, featuring GSAP animations and a modern design.",
    img: "/awwards.png",
    iconLists: ["/re.svg", "/tail.svg", "/gsap.svg", "/fm.svg"],
    link: "https://zentry-awards.web.app/",
  },
  {
    id: 4,
    title: "API Management Portal",
    des: "A web-based API management portal built with Next.js and Tailwind CSS.",
    img: "/portal.png",
    iconLists: ["/nodejs.svg", "/next.svg", "/tail.svg", "/ts.svg"],
    link: "https://portal.devchihub.com/",
  },
  {
    id: 5,
    title: "Next.js Modern Portfolio Website",
    des: "A modern portfolio website built with Next.js, Tailwind CSS, TypeScript, and Three.js. It showcases my work and skills.",
    img: "/portfolio.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "https://devchi.me",
  },
];

export const testimonials = [
  {
    quote:
      "Superb developer! Dev Chi optimized my website’s performance and improved load times significantly. He’s efficient, knowledgeable, and always delivers high-quality work.",
      name: "Lawrence Chukwudi",
    title: "Founder of NorseChukwudi Technologies",
  },
  {
    quote:
"If you need a developer who truly understands modern web technologies, Dev Chi is the guy. He built a custom solution tailored to my needs, and the end result was flawless!",
    name: "Cynthia Hilary",
    title: "Director of Math-Hilary Enterprises",
  },
  {
    quote:
    "Working with Dev Chi was a game-changer. He understood my requirements perfectly and built a seamless solution with excellent UI/UX. Professional, reliable, and highly skilled!",
    name: "Michael Obinna",
    title: "Senior Developer Advocate",
  },
];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Frontend Engineer Intern",
    desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Mobile App Dev - JSM Tech",
    desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Lead Developer",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/DevChiJay"
  },
  {
    id: 2,
    img: "/twit.svg",
    link: "https://x.com/DevChiJay"
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/chiemela-james-3681b5246/"
  },
];
