import { Stack, SxProps, Theme } from '@mui/material';

interface StackProps {
  children: React.ReactNode;
  spc?: number;
  sx?: SxProps<Theme>;
}

export const HorizontalStack = ({ children, spc, sx }: StackProps) => (
  <Stack
    sx={sx}
    direction="row"
    alignItems="center"
    justifyContent="center"
    spacing={spc || 0}
  >
    {children}
  </Stack>
);

export const HorizontalStackStrech = ({ children, spc, sx }: StackProps) => (
  <Stack
    sx={sx}
    direction="row"
    alignItems="center"
    justifyContent="stretch"
    spacing={spc || 0}
  >
    {children}
  </Stack>
);

export const VerticalStack = ({ children, spc, sx }: StackProps) => (
  <Stack
    sx={sx}
    direction="column"
    alignItems="center"
    justifyContent="center"
    spacing={spc || 0}
  >
    {children}
  </Stack>
);
