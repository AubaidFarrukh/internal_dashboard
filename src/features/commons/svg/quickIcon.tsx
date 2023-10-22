import type { FC } from "react";

export interface QuickIconProps {
  color?: string;
  size?: number;
}

export const QuickIcon: FC<QuickIconProps> = ({ color, size }) => (
  <svg
    version="1.2"
    overflow="visible"
    preserveAspectRatio="none"
    viewBox="0 0 43 37.00001"
    width={size ?? "43"}
    // height="37.00001"
  >
    <g transform="translate(0, 0)">
      <g transform="translate(0, -7.771561172376096e-16) rotate(0)">
        <path
          d="M29.84094,6.54736c3.41189,0.41699 6.47105,2.00769 8.77994,4.36657c2.70572,2.76514 4.37912,6.58562 4.37912,10.8045c0,4.21959 -1.67305,8.04007 -4.37912,10.80557c-2.70607,2.7655 -6.44445,4.47601 -10.57337,4.47601c-4.12892,0 -7.8666,-1.71051 -10.57267,-4.47601c-2.70607,-2.7655 -4.37947,-6.58598 -4.37947,-10.80557c0,-4.21923 1.67375,-8.03936 4.37947,-10.8045c2.47861,-2.53304 5.82401,-4.18097 9.5414,-4.43989v-2.56308c0,-0.03898 0.0021,-0.07725 0.0049,-0.11551h-2.8009c-0.45947,0 -0.8346,-0.38409 -0.8346,-0.85329v-2.08887c0,-0.4692 0.37513,-0.85329 0.8346,-0.85329h8.41705c0.45947,0 0.8353,0.38409 0.8353,0.85329v2.08887c0,0.46956 -0.37583,0.85329 -0.8353,0.85329h-2.8009c0.0035,0.03791 0.0049,0.07653 0.0049,0.11551v2.63639zM29.2485,19.43608c0.79471,0.43737 1.33466,1.29567 1.33466,2.28271c0,1.43121 -1.1352,2.59205 -2.53565,2.59205c-1.40045,0 -2.53565,-1.16084 -2.53565,-2.59205c0,-0.98704 0.54065,-1.84533 1.33536,-2.28271v-5.93797c0,-0.67769 0.53715,-1.227 1.20029,-1.227c0.66313,0 1.20099,0.54931 1.20099,1.227zM3.68379,30.25416c-0.66313,0 -1.20064,-0.54967 -1.20064,-1.22736c0,-0.67769 0.5375,-1.22665 1.20064,-1.22665h6.78109c0.66313,0 1.20029,0.54895 1.20029,1.22665c0,0.67769 -0.5375,1.22736 -1.20029,1.22736zM1.20029,23.03948c-0.66313,0 -1.20029,-0.54895 -1.20029,-1.22665c0,-0.67769 0.5375,-1.22736 1.20029,-1.22736h7.85505c0.66278,0 1.20029,0.54967 1.20029,1.22736c0,0.67769 -0.5375,1.22665 -1.20029,1.22665zM3.62326,16.0122c-0.66313,0 -1.20029,-0.54931 -1.20029,-1.22665c0,-0.67734 0.5375,-1.227 1.20029,-1.227h6.72895c0.66313,0 1.20064,0.54931 1.20064,1.227c0,0.67769 -0.5375,1.22665 -1.20064,1.22665zM41.47707,11.16319c0.5802,-1.41547 0.51126,-2.89817 -0.31914,-3.89165c-0.99662,-1.19196 -2.7981,-1.32857 -4.47115,-0.48994c1.77208,1.24202 3.3811,2.68682 4.7903,4.38159zM14.61865,11.16319c-0.58055,-1.41547 -0.51161,-2.89817 0.31879,-3.89165c0.99662,-1.19196 2.7981,-1.32857 4.47115,-0.48994c-1.77173,1.24202 -3.3811,2.68682 -4.78995,4.38159zM36.92333,12.64876c-2.2711,-2.32133 -5.40899,-3.75683 -8.87547,-3.75683c-3.46578,0 -6.60403,1.43586 -8.87512,3.75683c-2.27145,2.32097 -3.6761,5.52813 -3.6761,9.07003c0,3.54261 1.405,6.74941 3.6761,9.07038c2.2711,2.32097 5.40899,3.75718 8.87477,3.75718c3.46648,0 6.60438,-1.43621 8.87547,-3.75718c2.2711,-2.32097 3.6768,-5.52777 3.6768,-9.07074c0,-3.5419 -1.40535,-6.7487 -3.67645,-9.06967z"
          style={{
            strokeWidth: 0,
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            fill: color ?? "rgb(55, 121, 235)",
          }}
          vectorEffect="non-scaling-stroke"
        />
      </g>
      <defs>
        <path
          id="path-16885917773151060144"
          d="M29.84094,6.54736c3.41189,0.41699 6.47105,2.00769 8.77994,4.36657c2.70572,2.76514 4.37912,6.58562 4.37912,10.8045c0,4.21959 -1.67305,8.04007 -4.37912,10.80557c-2.70607,2.7655 -6.44445,4.47601 -10.57337,4.47601c-4.12892,0 -7.8666,-1.71051 -10.57267,-4.47601c-2.70607,-2.7655 -4.37947,-6.58598 -4.37947,-10.80557c0,-4.21923 1.67375,-8.03936 4.37947,-10.8045c2.47861,-2.53304 5.82401,-4.18097 9.5414,-4.43989v-2.56308c0,-0.03898 0.0021,-0.07725 0.0049,-0.11551h-2.8009c-0.45947,0 -0.8346,-0.38409 -0.8346,-0.85329v-2.08887c0,-0.4692 0.37513,-0.85329 0.8346,-0.85329h8.41705c0.45947,0 0.8353,0.38409 0.8353,0.85329v2.08887c0,0.46956 -0.37583,0.85329 -0.8353,0.85329h-2.8009c0.0035,0.03791 0.0049,0.07653 0.0049,0.11551v2.63639zM29.2485,19.43608c0.79471,0.43737 1.33466,1.29567 1.33466,2.28271c0,1.43121 -1.1352,2.59205 -2.53565,2.59205c-1.40045,0 -2.53565,-1.16084 -2.53565,-2.59205c0,-0.98704 0.54065,-1.84533 1.33536,-2.28271v-5.93797c0,-0.67769 0.53715,-1.227 1.20029,-1.227c0.66313,0 1.20099,0.54931 1.20099,1.227zM3.68379,30.25416c-0.66313,0 -1.20064,-0.54967 -1.20064,-1.22736c0,-0.67769 0.5375,-1.22665 1.20064,-1.22665h6.78109c0.66313,0 1.20029,0.54895 1.20029,1.22665c0,0.67769 -0.5375,1.22736 -1.20029,1.22736zM1.20029,23.03948c-0.66313,0 -1.20029,-0.54895 -1.20029,-1.22665c0,-0.67769 0.5375,-1.22736 1.20029,-1.22736h7.85505c0.66278,0 1.20029,0.54967 1.20029,1.22736c0,0.67769 -0.5375,1.22665 -1.20029,1.22665zM3.62326,16.0122c-0.66313,0 -1.20029,-0.54931 -1.20029,-1.22665c0,-0.67734 0.5375,-1.227 1.20029,-1.227h6.72895c0.66313,0 1.20064,0.54931 1.20064,1.227c0,0.67769 -0.5375,1.22665 -1.20064,1.22665zM41.47707,11.16319c0.5802,-1.41547 0.51126,-2.89817 -0.31914,-3.89165c-0.99662,-1.19196 -2.7981,-1.32857 -4.47115,-0.48994c1.77208,1.24202 3.3811,2.68682 4.7903,4.38159zM14.61865,11.16319c-0.58055,-1.41547 -0.51161,-2.89817 0.31879,-3.89165c0.99662,-1.19196 2.7981,-1.32857 4.47115,-0.48994c-1.77173,1.24202 -3.3811,2.68682 -4.78995,4.38159zM36.92333,12.64876c-2.2711,-2.32133 -5.40899,-3.75683 -8.87547,-3.75683c-3.46578,0 -6.60403,1.43586 -8.87512,3.75683c-2.27145,2.32097 -3.6761,5.52813 -3.6761,9.07003c0,3.54261 1.405,6.74941 3.6761,9.07038c2.2711,2.32097 5.40899,3.75718 8.87477,3.75718c3.46648,0 6.60438,-1.43621 8.87547,-3.75718c2.2711,-2.32097 3.6768,-5.52777 3.6768,-9.07074c0,-3.5419 -1.40535,-6.7487 -3.67645,-9.06967z"
          vectorEffect="non-scaling-stroke"
        />
      </defs>
    </g>
  </svg>
);

export default QuickIcon;
