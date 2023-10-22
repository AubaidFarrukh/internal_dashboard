import type { FC } from "react";
import { SvgIcon, SxProps, Theme } from "@mui/material";

export interface BulkIconProps {
  color?: string;
  size?: number;
  sx?: SxProps<Theme>;
}

export const BulkIcon: FC<BulkIconProps> = ({ color, size, sx }) => (
  <SvgIcon
    viewBox="0 0 21.999990000000004 22.999995781523786"
    sx={{
      color: color ?? "rgb(0, 0, 0)",
      // width: "21.999990000000004",
      height: size ?? "22.999995781523786",
      ...sx,
    }}
  >
    <g transform="translate(0, 0)">
      <g transform="translate(0, 0) rotate(0)">
        <path
          style={{
            strokeWidth: 0,
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            fill: color ?? "rgb(0, 0, 0)",
          }}
          d="M11.54421,20.57028c-1.20421,0.43718 -2.53579,-0.18407 -2.97579,-1.36905c-0.46316,-1.19648 0.17368,-2.51951 1.37789,-2.94518c1.20421,-0.43718 2.53579,0.17257 2.97579,1.35755c0.44,1.19648 -0.18526,2.51951 -1.37789,2.95669zM9.14737,14.09317c-2.39684,0.86285 -3.63579,3.50891 -2.77895,5.90187c0.90316,2.38146 3.56632,3.58944 5.97474,2.7266c2.39684,-0.86285 3.62421,-3.50891 2.75579,-5.89037c-0.88,-2.39296 -3.55474,-3.60095 -5.95158,-2.7381zM16.14105,2.96819l-7.60737,2.78412l1.59789,4.30273l7.60737,-2.77262zM21.21263,13.36838l-5.53474,2.01331c0.19684,0.33363 0.35895,0.67877 0.49789,1.04692c0.13895,0.36815 0.23158,0.7478 0.28947,1.11595l5.53474,-2.01331zM20.30947,7.57005l-9.78421,3.56643l0.56737,1.51861c1.44737,0.10354 2.80211,0.7363 3.83263,1.78322l6.98211,-2.54252zM0,0v2.30093h3.57789l4.13368,11.21701c0.32421,-0.20708 0.67158,-0.36815 1.04211,-0.5062c0.37053,-0.13806 0.75263,-0.23009 1.12316,-0.28762l-4.66632,-12.72412z"
          vectorEffect="non-scaling-stroke"
        />
      </g>
      <defs>
        <path
          id="path-1681225700448188"
          d="M11.54421,20.57028c-1.20421,0.43718 -2.53579,-0.18407 -2.97579,-1.36905c-0.46316,-1.19648 0.17368,-2.51951 1.37789,-2.94518c1.20421,-0.43718 2.53579,0.17257 2.97579,1.35755c0.44,1.19648 -0.18526,2.51951 -1.37789,2.95669zM9.14737,14.09317c-2.39684,0.86285 -3.63579,3.50891 -2.77895,5.90187c0.90316,2.38146 3.56632,3.58944 5.97474,2.7266c2.39684,-0.86285 3.62421,-3.50891 2.75579,-5.89037c-0.88,-2.39296 -3.55474,-3.60095 -5.95158,-2.7381zM16.14105,2.96819l-7.60737,2.78412l1.59789,4.30273l7.60737,-2.77262zM21.21263,13.36838l-5.53474,2.01331c0.19684,0.33363 0.35895,0.67877 0.49789,1.04692c0.13895,0.36815 0.23158,0.7478 0.28947,1.11595l5.53474,-2.01331zM20.30947,7.57005l-9.78421,3.56643l0.56737,1.51861c1.44737,0.10354 2.80211,0.7363 3.83263,1.78322l6.98211,-2.54252zM0,0v2.30093h3.57789l4.13368,11.21701c0.32421,-0.20708 0.67158,-0.36815 1.04211,-0.5062c0.37053,-0.13806 0.75263,-0.23009 1.12316,-0.28762l-4.66632,-12.72412z"
          vectorEffect="non-scaling-stroke"
        />
      </defs>
    </g>
  </SvgIcon>
);

export default BulkIcon;