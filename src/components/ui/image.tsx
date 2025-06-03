import { type ImageProps, default as NextImage } from "next/image";
import {
    Image as MantineImage,
    type ImageProps as MantineImageProps,
} from "@mantine/core";

export const Image = ({ ...props }: ImageProps & MantineImageProps) => (
    <MantineImage component={NextImage} {...props} />
);
