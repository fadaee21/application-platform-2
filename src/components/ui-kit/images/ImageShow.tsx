import useGetImage from "@/hooks/useGetImage";
import { LoadingPulsImage } from "../LoadingSpinner";

interface IProps {
  imageAddress: string;
  alt: string;
}
const ImageShow = ({ imageAddress, alt }: IProps) => {
  const { pic, isLoading } = useGetImage(imageAddress);

  if (isLoading) return <LoadingPulsImage />;

  return <img src={pic} alt={alt} className="w-full h-full" loading="lazy" />;
};

export default ImageShow;
