import { Stack, SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface StackProps {
  children: React.ReactNode;
  ai?: 'center' | 'stretch';
  jc?: 'center' | 'stretch' | 'space-between';
  spc?: number;
  sx?: SxProps<Theme>;
}

export const HorizontalStack = ({ children, spc, sx, ...args }: StackProps) => (
  <Stack
    sx={sx}
    direction="row"
    alignItems={args.ai || 'center'}
    justifyContent={args.jc || 'center'}
    spacing={spc || 0}
  >
    {children}
  </Stack>
);

export const HorizontalStackBreakpoint = ({ children, spc, sx, ...args }: StackProps) =>
  useMediaQuery(useTheme().breakpoints.up('md')) ? (
    <Stack
      sx={sx}
      direction="row"
      alignItems={args.ai || 'center'}
      justifyContent={args.jc || 'center'}
      spacing={spc || 0}
    >
      {children}
    </Stack>
  ) : (
    <Stack
      sx={sx}
      direction="column-reverse"
      alignItems={args.ai || 'center'}
      justifyContent={args.jc || 'center'}
      spacing={spc || 0}
    >
      {children}
    </Stack>
  );

export const VerticalStack = ({ children, spc, sx, ...args }: StackProps) => (
  <Stack
    sx={sx}
    direction="column"
    alignItems={args.ai || 'center'}
    justifyContent={args.jc || 'start'}
    spacing={spc || 0}
  >
    {children}
  </Stack>
);
