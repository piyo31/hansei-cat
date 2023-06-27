import { IconButton } from "@chakra-ui/react";
import { BsShare } from "react-icons/bs";

type Props = {
  dataURL: string;
};

const toBlob = (base64: string) => {
  const decodedData = atob(base64.replace(/^.*,/, ""));
  const buffers = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; i++) {
    buffers[i] = decodedData.charCodeAt(i);
  }
  try {
    const blob = new Blob([buffers.buffer], {
      type: "image/png",
    });
    return blob;
  } catch (e) {
    return null;
  }
};
export const dataUrlToShareData = (data: string): ShareData | null => {
  const blob = toBlob(data);
  if (blob === null) return null;
  const imageFile = new File([blob], "image.png", {
    type: "image/png",
  });
  const shareData = {
    files: [imageFile],
  };
  return shareData;
};
export const canShare = (data: ShareData | null): boolean =>
  typeof navigator.canShare === "function" &&
  data !== null &&
  navigator.canShare(data);
const ShareButton = (props: Props) => {
  const { dataURL } = props;
  const onClick = () => {
    const shareData = dataUrlToShareData(dataURL);

    shareData &&
      canShare(shareData) &&
      navigator
        .share(shareData)
        .then(() => {
          console.log("success sharing");
        })
        .catch((error) => {
          console.log(error);
        });
  };
  return <IconButton aria-label="Share" icon={<BsShare />} onClick={onClick} />;
};
export default ShareButton;
