import type { FC } from "react";

export interface TruckIconProps {
  color?: string;
}

export const TruckIcon: FC<TruckIconProps> = ({ color }) => (
  <svg
    version="1.2"
    overflow="visible"
    preserveAspectRatio="none"
    viewBox="0 0 48.00000878935512 32"
    width="48.00000878935512"
    height="32"
  >
    <g transform="translate(0, 0)">
      <g transform="translate(-0.0024309703016537985, 2.220446049250313e-16) rotate(0)">
        <path
          style={{
            fill: color ?? "rgb(219, 219, 219)",
            strokeWidth: 0,
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
          }}
          d="M33.67904,7.85825l-3.76213,-0.02535v-5.08707c0,-0.75757 -0.30656,-1.44192 -0.80624,-1.93851c-0.49593,-0.50035 -1.17936,-0.80732 -1.93591,-0.80732h-24.429c-0.83342,0 -1.58248,0.37738 -2.08684,0.96973c-0.71436,0.84018 -0.6553,1.65313 -0.6553,2.62755v21.11054c0,1.49355 1.22998,2.81718 2.74214,2.81718h4.47837c0.41249,0 0.74343,-0.33232 0.74343,-0.74443c0,-0.41211 -0.33093,-0.74349 -0.74343,-0.74349v0.00375h-4.48306c-0.69936,0 -1.25154,-0.65243 -1.25154,-1.33302v-21.13213c0,-0.65337 -0.12656,-1.226 0.37593,-1.7226c0.23385,-0.2331 0.55033,-0.36405 0.8803,-0.36423h24.429c0.34499,0 0.65999,0.14269 0.88686,0.36987c0.22593,0.22718 0.36937,0.54166 0.36937,0.88712v23.295h-5.89866c-0.41156,0 -0.74343,0.33232 -0.74343,0.74443c0,0.41211 0.33187,0.74349 0.74343,0.74349h6.64115c0.41156,0 0.74343,-0.33138 0.74343,-0.74349v-0.84581h3.00277c0.33937,-7.74372 11.44482,-8.81202 12.57449,0h2.43934c0.62812,-7.55034 -3.09558,-10.48486 -8.75893,-11.14856c-0.40687,-1.77235 -1.18404,-3.41704 -2.06153,-5.04295c-1.04342,-1.93288 -1.28717,-1.85496 -3.43401,-1.8897zM14.95127,4.10138c0.57937,0 1.14654,0.06571 1.69029,0.18963c0.55968,0.12673 1.09686,0.31636 1.60216,0.55949c0.05437,0.02628 0.07781,0.09294 0.05156,0.14738c-0.00844,0.01784 -0.02062,0.03192 -0.03562,0.04224l-0.57562,0.46374l-0.53999,0.44966c-0.03094,0.02628 -0.07219,0.03192 -0.10781,0.01877c-0.32812,-0.11922 -0.67124,-0.21122 -1.02373,-0.27318c-0.34312,-0.06008 -0.69843,-0.092 -1.0603,-0.092c-1.62372,0 -3.16589,0.63929 -4.31337,1.78925c-1.14936,1.15184 -1.78778,2.69233 -1.78778,4.32011c0,2.47641 1.49341,4.70406 3.76775,5.64656c3.11995,1.29453 6.69552,-0.21967 7.97238,-3.31002c0.30594,-0.74085 0.463,-1.53484 0.46218,-2.33654c0,-0.39615 -0.0375,-0.78479 -0.11344,-1.17343c-0.00562,-0.03379 0.00375,-0.06759 0.02344,-0.092l0.48749,-0.62708l0.50249,-0.62802c0.0252,-0.03073 0.06502,-0.04543 0.10411,-0.03842c0.03909,0.00701 0.07134,0.03463 0.08432,0.07221c0.27656,0.79981 0.41531,1.64093 0.41531,2.48674c0,1.03074 -0.20531,2.01455 -0.57655,2.91105c-1.59185,3.85074 -6.04678,5.7395 -9.93547,4.12673c-2.82558,-1.17062 -4.69868,-3.93992 -4.69868,-7.03778c0,-2.02488 0.7978,-3.95306 2.22747,-5.38465c1.42967,-1.43159 3.35526,-2.23046 5.37742,-2.23046zM14.77971,21.91786c-2.77964,0 -5.0343,2.25769 -5.0343,5.04107c0,2.78338 2.25465,5.04107 5.0343,5.04107c2.77964,0 5.03336,-2.25769 5.03336,-5.04107c-0.00375,-2.78338 -2.25372,-5.04107 -5.03336,-5.04107zM14.77971,25.02136c-1.06592,0 -1.93591,0.86552 -1.93591,1.93757c0,1.06829 0.8653,1.93851 1.93591,1.93851c1.06592,0 1.93591,-0.86646 1.93591,-1.93851c-0.00469,-1.07205 -0.86999,-1.93757 -1.93591,-1.93757zM39.18902,21.17625c-2.77871,0 -5.03336,2.25769 -5.03336,5.04107c0,2.78338 2.25465,5.04107 5.03336,5.04107c2.77964,0 5.0343,-2.25769 5.0343,-5.04107c0,-2.78338 -2.25465,-5.04107 -5.0343,-5.04107zM37.25405,26.21732c0,1.06829 0.86436,1.93851 1.93497,1.93851c1.07061,0 1.93591,-0.86646 1.93591,-1.93851c0,-1.07205 -0.8653,-1.93757 -1.93591,-1.93757c-1.0678,0 -1.93497,0.8674 -1.93497,1.93757zM34.03754,10.00986l-2.26778,-0.04224v4.83173h4.80368c-0.59249,-1.72354 -1.46904,-3.30345 -2.5359,-4.78949z"
          vectorEffect="non-scaling-stroke"
        />
      </g>
      <defs>
        <path
          id="path-1679414178211592"
          d="M33.67904,7.85825l-3.76213,-0.02535v-5.08707c0,-0.75757 -0.30656,-1.44192 -0.80624,-1.93851c-0.49593,-0.50035 -1.17936,-0.80732 -1.93591,-0.80732h-24.429c-0.83342,0 -1.58248,0.37738 -2.08684,0.96973c-0.71436,0.84018 -0.6553,1.65313 -0.6553,2.62755v21.11054c0,1.49355 1.22998,2.81718 2.74214,2.81718h4.47837c0.41249,0 0.74343,-0.33232 0.74343,-0.74443c0,-0.41211 -0.33093,-0.74349 -0.74343,-0.74349v0.00375h-4.48306c-0.69936,0 -1.25154,-0.65243 -1.25154,-1.33302v-21.13213c0,-0.65337 -0.12656,-1.226 0.37593,-1.7226c0.23385,-0.2331 0.55033,-0.36405 0.8803,-0.36423h24.429c0.34499,0 0.65999,0.14269 0.88686,0.36987c0.22593,0.22718 0.36937,0.54166 0.36937,0.88712v23.295h-5.89866c-0.41156,0 -0.74343,0.33232 -0.74343,0.74443c0,0.41211 0.33187,0.74349 0.74343,0.74349h6.64115c0.41156,0 0.74343,-0.33138 0.74343,-0.74349v-0.84581h3.00277c0.33937,-7.74372 11.44482,-8.81202 12.57449,0h2.43934c0.62812,-7.55034 -3.09558,-10.48486 -8.75893,-11.14856c-0.40687,-1.77235 -1.18404,-3.41704 -2.06153,-5.04295c-1.04342,-1.93288 -1.28717,-1.85496 -3.43401,-1.8897zM14.95127,4.10138c0.57937,0 1.14654,0.06571 1.69029,0.18963c0.55968,0.12673 1.09686,0.31636 1.60216,0.55949c0.05437,0.02628 0.07781,0.09294 0.05156,0.14738c-0.00844,0.01784 -0.02062,0.03192 -0.03562,0.04224l-0.57562,0.46374l-0.53999,0.44966c-0.03094,0.02628 -0.07219,0.03192 -0.10781,0.01877c-0.32812,-0.11922 -0.67124,-0.21122 -1.02373,-0.27318c-0.34312,-0.06008 -0.69843,-0.092 -1.0603,-0.092c-1.62372,0 -3.16589,0.63929 -4.31337,1.78925c-1.14936,1.15184 -1.78778,2.69233 -1.78778,4.32011c0,2.47641 1.49341,4.70406 3.76775,5.64656c3.11995,1.29453 6.69552,-0.21967 7.97238,-3.31002c0.30594,-0.74085 0.463,-1.53484 0.46218,-2.33654c0,-0.39615 -0.0375,-0.78479 -0.11344,-1.17343c-0.00562,-0.03379 0.00375,-0.06759 0.02344,-0.092l0.48749,-0.62708l0.50249,-0.62802c0.0252,-0.03073 0.06502,-0.04543 0.10411,-0.03842c0.03909,0.00701 0.07134,0.03463 0.08432,0.07221c0.27656,0.79981 0.41531,1.64093 0.41531,2.48674c0,1.03074 -0.20531,2.01455 -0.57655,2.91105c-1.59185,3.85074 -6.04678,5.7395 -9.93547,4.12673c-2.82558,-1.17062 -4.69868,-3.93992 -4.69868,-7.03778c0,-2.02488 0.7978,-3.95306 2.22747,-5.38465c1.42967,-1.43159 3.35526,-2.23046 5.37742,-2.23046zM14.77971,21.91786c-2.77964,0 -5.0343,2.25769 -5.0343,5.04107c0,2.78338 2.25465,5.04107 5.0343,5.04107c2.77964,0 5.03336,-2.25769 5.03336,-5.04107c-0.00375,-2.78338 -2.25372,-5.04107 -5.03336,-5.04107zM14.77971,25.02136c-1.06592,0 -1.93591,0.86552 -1.93591,1.93757c0,1.06829 0.8653,1.93851 1.93591,1.93851c1.06592,0 1.93591,-0.86646 1.93591,-1.93851c-0.00469,-1.07205 -0.86999,-1.93757 -1.93591,-1.93757zM39.18902,21.17625c-2.77871,0 -5.03336,2.25769 -5.03336,5.04107c0,2.78338 2.25465,5.04107 5.03336,5.04107c2.77964,0 5.0343,-2.25769 5.0343,-5.04107c0,-2.78338 -2.25465,-5.04107 -5.0343,-5.04107zM37.25405,26.21732c0,1.06829 0.86436,1.93851 1.93497,1.93851c1.07061,0 1.93591,-0.86646 1.93591,-1.93851c0,-1.07205 -0.8653,-1.93757 -1.93591,-1.93757c-1.0678,0 -1.93497,0.8674 -1.93497,1.93757zM34.03754,10.00986l-2.26778,-0.04224v4.83173h4.80368c-0.59249,-1.72354 -1.46904,-3.30345 -2.5359,-4.78949z"
          vectorEffect="non-scaling-stroke"
        />
      </defs>
    </g>
  </svg>
);

export default TruckIcon;
