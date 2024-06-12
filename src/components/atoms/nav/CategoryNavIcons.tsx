import React from 'react'

const AllSvgIcon = () => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_328_13773)">
        <path d="M9 7.8125V4.4375" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.625 11.1875V7.8125" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12.375 11.1875V7.8125" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9 14.5625V11.1875" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M2.25 7.8125H15.75" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M2.25 11.1875H15.75" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15.75 4.4375H2.25V14.5625H15.75V4.4375Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_328_13773">
          <rect width="18" height="18" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

const FaceSvgIcon = () => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_328_13798)">
        <path d="M15.1875 3.52904C15.1876 3.43758 15.1654 3.34746 15.1229 3.26651C15.0803 3.18555 15.0186 3.1162 14.9432 3.06446C14.8678 3.01272 14.7809 2.98016 14.69 2.96959C14.5991 2.95902 14.5071 2.97076 14.4218 3.00381C13.3594 3.41724 11.3126 4.07115 9 4.07115C6.68742 4.07115 4.64062 3.41724 3.5782 3.00521C3.49302 2.97221 3.40109 2.96046 3.31035 2.97095C3.21961 2.98145 3.13279 3.01389 3.0574 3.06547C2.982 3.11705 2.92031 3.18621 2.87764 3.26698C2.83497 3.34775 2.81261 3.43769 2.8125 3.52904V7.45037C2.8125 12.4306 5.58281 16.4665 9 16.4665C12.4172 16.4665 15.1875 12.4306 15.1875 7.45178V3.52904Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.125 8.18164C10.4337 7.83641 11.0313 7.61914 11.5312 7.61914C12.0312 7.61914 12.6288 7.83641 12.9375 8.18164" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.0625 8.18164C5.37117 7.83641 5.96883 7.61914 6.46875 7.61914C6.96867 7.61914 7.56633 7.83641 7.875 8.18164" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M11.416 12.6191C11.1197 12.9715 10.7499 13.2548 10.3326 13.4492C9.91525 13.6436 9.46043 13.7443 9.00004 13.7443C8.53966 13.7443 8.08484 13.6436 7.6675 13.4492C7.25015 13.2548 6.88038 12.9715 6.58411 12.6191" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_328_13798">
          <rect width="18" height="18" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

const ImageSvgIcon = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="ImageSquare" clip-path="url(#clip0_781_5802)">
        <path id="Vector" d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z" stroke="#9591A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path id="Vector_2" d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="#9591A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path id="Vector_3" d="M7.08594 26.9998L20.7922 13.2923C20.8851 13.1993 20.9953 13.1256 21.1167 13.0753C21.2381 13.0249 21.3683 12.999 21.4997 12.999C21.6311 12.999 21.7612 13.0249 21.8826 13.0753C22.004 13.1256 22.1143 13.1993 22.2072 13.2923L26.9997 18.0861" stroke="#9591A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_781_5802">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

const useCategoryNavIcons = () => {
  return { AllSvgIcon, FaceSvgIcon, ImageSvgIcon }
}

export default useCategoryNavIcons
