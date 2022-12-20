import { Image } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Image src={'/Marcatus.png'} alt={'Logo'} height={'80px'} width={'80px'} objectFit={'contain'} />
  );
};
export default Logo;
