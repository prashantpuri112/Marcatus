import { Image, Link } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Link href="/"><Image src={'/Marcatus.png'} alt={'Logo'} height={'80px'} width={'80px'} objectFit={'contain'} /></Link>
  );
};
export default Logo;
