import { Size } from "@/ts/enums/Size";
import { ButtonColor } from "@/ts/types/shared/ButtonColor";
import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IB4CButtonProps {
  label: string;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: ButtonColor;
  startIcon?: ReactNode;
  isSubmit?: boolean;
  size?: Size;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

export const B4CButton = ({
  variant = "primary",
  disabled,
  label,
  fullWidth,
  isSubmit,
  size = Size.Normal,
  startIcon,
  sx,
  onClick,
}: IB4CButtonProps) => {
  const sizes = {
    small: {
      paddingBlock: `14px`,
      paddingInline: `${14 * 5}px`,
    },
    normal: {
      paddingBlock: `16px`,
      paddingInline: `${16 * 5}px`,
    },
    medium: {
      paddingBlock: `18px`,
      paddingInline: `${18 * 5}px`,
    },
    large: {
      paddingBlock: `20px`,
      paddingInline: `${20 * 5}px`,
    },
  };

  const renderIcon = (icon: ReactNode) => {
    if (icon) {
      return <Box sx={{ display: "flex", marginRight: "12px" }}>{icon}</Box>;
    }
    return null;
  };
  return (
    <Button
      type={isSubmit ? "submit" : "button"}
      variant={variant}
      startIcon={renderIcon(startIcon)}
      disabled={disabled}
      onClick={onClick}
      sx={{
        width: fullWidth ? "100%" : "inherit",
        paddingInline: sizes[size].paddingInline,
        paddingBlock: sizes[size].paddingBlock,
        borderRadius: "8px",

        ...sx,
      }}
    >
      <Typography
        variant={`body-${size}-bold`}
        sx={{ textTransform: "none", opacity: 0.8, flexWrap: "wrap" }}
      >
        {label}
      </Typography>
    </Button>
  );
};
