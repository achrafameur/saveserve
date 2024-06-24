import { useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Link,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PeopleIcon from "@mui/icons-material/People";
import ErrorIcon from "@mui/icons-material/Error";
import ChecklistIcon from "@mui/icons-material/Checklist";

const getSections = (t) => [
  {
    title: t("General"),
    items: [
      {
        title: t("Overview"),
        path: "/dashboard",
        icon: <HomeIcon fontSize="small" />,
      },
    ],
  },
  {
    title: t("Management"),
    items: [
      {
        title: t("Customers"),
        path: "/dashboard/customers",
        icon: <PeopleIcon fontSize="small" />,
        children: [
          {
            title: t("List"),
            path: "/dashboard/customers",
          },
          {
            title: t("Details"),
            path: "/dashboard/customers/1",
          },
          {
            title: t("Edit"),
            path: "/dashboard/customers/1/edit",
          },
        ],
      },
    ],
  },
  {
    title: t("Platforms"),
    items: [
      {
        title: t("Job Listings"),
        path: "/dashboard/jobs",
        icon: <MapsHomeWorkIcon fontSize="small" />,
        children: [
          {
            title: t("Browse"),
            path: "/dashboard/jobs",
          },
          {
            title: t("Details"),
            path: "/dashboard/jobs/companies/1",
          },
          {
            title: t("Create"),
            path: "/dashboard/jobs/new",
          },
        ],
      },
    ],
  },
  {
    title: t("Apps"),
    items: [
      {
        title: t("Calendar"),
        path: "/dashboard/calendar",
        icon: <CalendarMonthIcon fontSize="small" />,
      },
    ],
  },
  {
    title: t("Pages"),
    items: [
      {
        title: t("Error"),
        path: "/error",
        icon: <ErrorIcon fontSize="small" />,
        children: [
          {
            title: "401",
            path: "/401",
          },
          {
            title: "404",
            path: "/404",
          },
          {
            title: "500",
            path: "/500",
          },
        ],
      },
    ],
  },
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] =
    useState(false);

  const handleOpenOrganizationsPopover = () => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Link href="/" underline="none">
              {/* Utilisation d'une image MUI */}
              <img
                src="/path/vers/votre/logo.jpg"
                alt="Logo"
                style={{ height: 42, width: 42 }}
              />
            </Link>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              onClick={handleOpenOrganizationsPopover}
              ref={organizationsRef}
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Acme Inc
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  {t("Your tier")} : Premium
                </Typography>
              </div>
              <ChecklistIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Divider
          sx={{
            borderColor: "#2D3748", // dark divider
          }}
        />
        <Box sx={{ p: 2 }}>
          <Typography color="neutral.100" variant="subtitle2">
            {t("Need Help?")}
          </Typography>
          <Typography color="neutral.500" variant="body2">
            {t("Check our docs")}
          </Typography>
          <Link href="/docs/welcome" underline="none">
            <Button
              color="secondary"
              component="a"
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              {t("Documentation")}
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
