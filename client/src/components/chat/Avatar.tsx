import { Avatar, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

interface BadgeAvatarsProps {
  profilePhoto: string;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-dot": {
    backgroundColor: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

export default function BadgeAvatars({ profilePhoto }: BadgeAvatarsProps) {
  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" src={profilePhoto} />
      </StyledBadge>
    </Stack>
  );
}
