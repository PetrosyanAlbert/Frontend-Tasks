import { BASE } from "../../../config/axios";

type Props = {
    src?: string;
    className?: string;
};

export const Image: React.FC<Props> = ({ src, className }) => {
    const imageUrl = src
        ? `${BASE}/${src}`
        : "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png";

    return (
        <img
            src={imageUrl}
            className={className}
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                    "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png";
            }}
        />
    );
};
