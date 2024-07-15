import React from "react";

const C52 = ({ onClickBack, onClickLevel }: any) => {
  return (
    <div>
      <svg width="285" height="288" viewBox="0 0 285 288" fill="none">
        <path
          d="M9.41558 2.42926L10.8448 1L11.9168 1.71463L11.9169 3.14389C11.9171 3.5012 12.9889 3.85852 13.7035 3.85852H15.4901L15.8474 4.93046C16.0856 5.28778 16.6335 6.07387 16.9194 6.35972C17.2767 6.71704 17.9913 6.00241 18.3486 6.00241C18.6345 6.00241 18.7059 5.7642 18.7059 5.64509V6.00241L19.4206 6.71704C19.7779 6.83614 20.564 7.07436 20.8498 7.07436H22.2791H22.6364L22.9937 7.43167C22.8746 7.55078 22.8508 7.86045 23.7083 8.1463C24.5659 8.43215 25.0185 9.45646 25.1376 9.93287L26.9242 9.21825V9.57556C27.0433 9.93287 27.2815 10.719 27.2815 11.0048V12.4341C27.2815 12.7914 27.6388 12.7914 27.9961 13.1487C28.3534 13.506 29.4254 12.7914 29.7827 12.4341C30.14 12.0768 30.4973 11.7194 30.4973 11.3621C30.4973 11.0048 31.212 11.0048 31.5693 10.6475C31.9266 10.2902 31.9266 10.6475 32.6412 11.0048C33.3558 11.3621 32.2839 12.4341 32.2839 12.7914C32.2839 13.1487 32.6412 13.1487 32.9985 13.1487C33.2844 13.1487 34.3087 13.3869 34.7851 13.506C35.1424 13.506 35.9285 13.4346 36.2144 13.1487C36.5002 12.8629 37.0481 13.0296 37.2863 13.1487L38.3583 13.506H40.1448C40.7165 13.506 42.0505 13.7442 42.646 13.8633C42.8842 13.8633 43.4321 13.7919 43.718 13.506C44.0038 13.2202 44.5517 13.1487 44.7899 13.1487C45.0281 13.0296 45.5046 12.7199 45.5046 12.4341C45.5046 12.1482 46.2192 12.0768 46.5765 12.0768C46.8147 11.8386 47.2911 11.2907 47.2911 11.0048C47.2911 10.6475 48.0058 11.0048 49.0777 11.3621C49.9353 11.648 50.1497 12.4341 50.1497 12.7914C50.3879 13.2678 51.0072 14.2921 51.5789 14.578C52.2935 14.9353 52.6509 16.0072 53.0082 16.7219C53.3655 17.4365 54.0801 18.8657 54.0801 19.2231C54.0801 19.5804 54.4374 19.9377 54.7947 20.6523C55.1521 21.367 54.7947 22.0816 54.4374 22.7962C54.0801 23.5108 53.7228 23.8682 53.7228 24.5828V26.0121L54.7947 28.1559C55.1521 28.8706 56.224 29.9425 57.296 30.2998C58.1535 30.5857 59.7972 29.4661 60.5118 28.8706H62.2984H64.0849C64.4422 28.8706 65.8715 29.2279 66.9435 28.8706C68.0154 28.5133 68.3727 27.4413 69.0873 26.7267C69.659 26.155 71.2312 25.5356 71.9459 25.2974C72.4223 25.2974 73.5181 25.3689 74.0898 25.6547C74.8044 26.0121 74.8044 25.2974 74.8044 24.9401C74.8044 24.6543 75.2808 24.3446 75.519 24.2255C75.9954 23.9873 77.0912 23.5108 77.6629 23.5108C78.2346 23.5108 79.3304 24.2255 79.8068 24.5828H83.0226C83.8802 24.5828 85.0474 23.6299 85.5238 23.1535C85.762 22.9153 86.3099 22.4389 86.5958 22.4389C86.9531 22.4389 86.9531 21.7243 87.3104 21.7243C87.5963 21.7243 87.9059 21.4861 88.025 21.367L89.4543 21.7243H91.2409H93.3848C93.6706 21.7243 94.2185 21.4861 94.4567 21.367C94.814 20.8905 95.5287 19.8662 95.5287 19.5804C95.5287 19.2945 96.4815 18.5084 96.9579 18.1511C97.1961 18.3893 97.744 18.8657 98.0299 18.8657C98.3872 18.8657 99.1018 20.295 99.4591 20.6523C99.745 20.9382 100.293 21.9625 100.531 22.4389C100.65 22.7962 100.888 23.5823 100.888 23.8682C100.888 24.2255 101.246 24.9401 101.246 25.2974C101.246 25.5833 101.722 26.1312 101.96 26.3694C102.199 26.4885 102.818 26.7267 103.39 26.7267C103.961 26.7267 104.819 27.6795 105.176 28.1559C105.295 28.275 105.605 28.5133 105.891 28.5133C106.248 28.5133 106.605 28.8706 107.32 29.2279C107.892 29.5137 108.273 29.5852 108.392 29.5852C109.107 29.5852 110.607 29.6567 110.893 29.9425C111.251 30.2998 112.322 30.2998 112.68 31.3718L113.752 34.5876C114.347 34.7067 115.61 34.9449 115.896 34.9449C116.181 34.9449 116.729 35.1831 116.968 35.3022C117.563 35.5405 118.826 36.0169 119.111 36.0169C119.397 36.0169 119.469 36.4933 119.469 36.7315L120.541 37.8034C120.827 38.0893 121.613 38.399 121.97 38.5181C122.685 38.7563 124.257 39.2327 124.828 39.2327C125.4 39.2327 126.972 40.662 127.687 41.3766L129.474 42.8059L130.188 44.2351C130.903 44.4733 132.332 45.0212 132.332 45.3071C132.332 45.5929 133.523 45.6644 134.119 45.6644L135.548 46.0217C135.905 46.1408 136.691 46.379 136.977 46.379C137.335 46.379 139.121 45.6644 139.836 46.0217C140.55 46.379 140.908 46.379 141.265 46.379C141.622 46.379 141.98 46.379 142.337 46.0217C142.694 45.6644 142.694 46.0217 142.694 45.6644C142.694 45.3785 143.409 45.3071 143.766 45.3071C144.123 45.4262 144.91 45.6644 145.195 45.6644C145.553 45.6644 145.91 46.379 146.267 46.379C146.553 46.379 147.816 46.8554 148.411 47.0936L149.483 49.2375L151.627 51.3814C151.865 51.5005 152.342 51.8102 152.342 52.096C152.342 52.3819 153.295 53.168 153.771 53.5253C154.367 54.0017 155.629 54.9546 155.915 54.9546C156.272 54.9546 156.987 55.3119 157.344 55.3119C157.63 55.3119 157.701 55.5501 157.701 55.6692L158.773 56.3838L160.56 57.8131L163.419 60.3143L164.49 60.6716C164.848 60.7907 165.634 61.0289 165.92 61.0289C166.206 61.0289 166.992 61.7435 167.349 62.1009C167.587 62.4582 168.064 63.2443 168.064 63.5301C168.064 63.816 169.255 64.6021 169.85 64.9594L171.637 68.1752C171.756 68.5325 171.994 69.3186 171.994 69.6045C171.994 69.9618 173.423 69.9618 173.781 70.3191C174.138 70.6764 175.925 70.6764 176.639 70.6764C177.354 70.6764 180.57 70.6764 181.642 69.9618C182.714 69.2472 183.785 69.9618 184.143 70.3191L184.5 70.6764L184.857 71.3911C185.096 71.8675 185.643 72.8918 185.929 73.1776C186.215 73.4635 186.525 75.2024 186.644 76.0361L187.359 77.1081C187.597 77.3463 188.073 77.8942 188.073 78.18C188.073 78.5374 189.502 79.252 189.86 79.6093C190.146 79.8951 191.408 81.6341 192.004 82.4678C192.48 82.8251 193.504 83.5398 193.79 83.5398C194.148 83.5398 194.148 83.5398 194.505 83.8971C194.791 84.1829 195.815 84.2544 196.291 84.2544L198.435 85.3263L199.865 86.7556L200.937 87.8275L202.366 89.9714L202.723 92.1153L203.08 94.9738V95.6885V97.1177C203.08 97.4751 202.366 99.2616 202.009 99.6189C201.651 99.9763 202.009 100.691 202.009 101.048C202.009 101.334 202.247 102.12 202.366 102.477C202.485 103.192 202.795 104.764 203.08 105.336C203.366 105.908 203.438 107.718 203.438 108.552L203.795 108.909C204.272 109.028 205.296 109.338 205.582 109.624C205.868 109.91 206.415 109.743 206.654 109.624L207.368 110.338L209.512 112.482L210.584 113.554C211.18 113.912 212.371 114.698 212.371 114.983C212.371 115.341 213.443 115.341 213.8 115.341C214.157 115.341 214.515 116.413 214.872 116.77C215.229 117.127 214.872 117.842 214.872 118.199C214.872 118.557 214.515 118.914 214.515 119.629C214.515 120.2 214.991 121.058 215.229 121.415L216.301 122.487L217.73 123.559L219.874 124.631L221.304 125.703C221.899 125.822 223.09 126.132 223.09 126.418C223.09 126.775 224.519 127.49 224.877 127.49C225.163 127.49 225.472 129.633 225.591 130.705C225.83 131.063 226.449 131.849 227.021 132.135C227.735 132.492 227.735 133.207 228.093 133.564C228.378 133.85 229.879 134.159 230.594 134.279C230.832 134.279 231.308 134.35 231.308 134.636C231.308 134.993 232.023 134.993 232.023 135.35C232.023 135.636 233.452 136.184 234.167 136.422H235.239H236.668C237.025 136.422 237.025 136.78 237.383 136.78C237.669 136.78 238.693 138.209 239.169 138.924L239.527 139.638C240.479 139.876 242.457 140.353 242.742 140.353C243.028 140.353 243.338 140.829 243.457 141.067L246.316 144.283C246.792 144.522 247.816 144.998 248.102 144.998C248.459 144.998 248.459 145.355 248.817 145.355C249.174 145.355 249.174 145.355 249.889 145.713C250.603 146.07 251.675 145.713 252.033 145.713H253.105H253.819C254.105 145.713 255.129 146.427 255.606 146.785C256.082 147.023 257.106 147.499 257.392 147.499C257.678 147.499 257.75 148.69 257.75 149.286L258.107 150.715L259.179 152.859V153.574L259.894 155.003C260.132 155.479 260.68 156.432 260.965 156.432C261.323 156.432 261.323 157.861 261.68 158.219C261.966 158.504 262.276 160.005 262.395 160.72C263.467 160.958 265.682 161.434 265.968 161.434C266.325 161.434 267.04 162.506 267.04 162.864C267.04 163.15 267.754 163.936 268.112 164.293L269.184 166.437L269.898 166.794H271.328H272.757C273.114 166.794 273.114 167.866 273.471 167.866C273.829 167.866 273.829 169.295 274.186 169.653C274.543 170.01 274.186 170.367 273.471 171.439C272.9 172.297 272.28 172.511 272.042 172.511L271.685 172.869V173.94V174.655V175.727C271.685 176.084 272.042 176.442 272.042 176.799C272.042 177.085 271.804 178.586 271.685 179.3C271.447 179.896 270.97 181.158 270.97 181.444C270.97 181.801 270.256 182.873 270.256 183.231C270.256 183.588 270.97 184.66 272.757 185.375C274.543 186.089 273.114 185.732 273.114 186.089C273.114 186.446 273.471 186.446 273.471 186.804C273.471 187.161 273.829 187.161 274.186 187.518C274.543 187.876 275.258 187.876 275.258 188.233C275.258 188.59 275.973 188.948 276.33 188.948C276.616 188.948 276.211 189.424 275.973 189.662H275.615L274.901 190.377C274.615 190.663 274.782 190.972 274.901 191.092C274.901 191.211 274.972 191.52 275.258 191.806C275.615 192.164 275.615 192.521 275.973 192.878C276.33 193.235 276.33 195.022 276.687 195.022C277.045 195.022 277.759 195.737 278.117 195.737C278.402 195.737 278.95 196.213 279.189 196.451C279.308 196.69 279.617 197.237 279.903 197.523C280.189 197.809 280.022 198.357 279.903 198.595L280.618 200.382L280.26 201.096C280.141 201.692 279.975 203.026 280.26 203.598C280.546 204.169 280.38 205.98 280.26 206.813C280.38 207.052 280.618 207.6 280.618 207.885C280.618 208.243 281.332 207.885 282.047 207.885C282.762 207.885 283.476 208.957 283.834 208.957C284.12 208.957 284.191 209.672 284.191 210.029L283.119 210.387C282.881 210.506 282.404 210.815 282.404 211.101C282.404 211.387 281.213 211.935 280.618 212.173C280.26 212.411 279.474 212.959 279.189 213.245C278.831 213.602 278.117 213.96 277.759 214.317C277.402 214.674 276.687 215.746 276.687 216.104C276.687 216.461 275.615 217.176 275.258 217.533C274.901 217.89 274.901 218.605 274.543 219.677C274.258 220.534 274.186 221.94 274.186 222.535C274.186 222.774 274.258 223.25 274.543 223.25C274.901 223.25 275.615 223.965 275.973 223.965C276.33 223.965 276.687 225.394 277.045 225.751C277.402 226.108 277.402 226.823 277.402 227.538C277.402 228.252 277.045 228.61 277.045 228.967C277.045 229.324 275.258 231.111 274.901 231.825C274.543 232.54 274.901 233.612 274.901 233.969C274.901 234.327 274.543 235.399 274.901 235.756C275.258 236.113 274.186 240.401 274.186 240.758C274.186 241.116 273.829 242.188 273.829 242.545C273.829 242.902 273.114 242.902 272.757 243.26C272.4 243.617 272.757 243.974 272.4 244.689C272.042 245.403 272.757 245.403 272.757 246.475C272.757 247.547 272.4 247.19 272.4 248.262C272.4 249.334 271.328 249.334 270.97 249.334C270.613 249.334 269.898 250.406 269.184 251.12C268.469 251.835 268.826 251.478 268.826 251.835C268.826 252.192 267.397 252.55 267.04 252.907C266.754 253.193 266.206 254.217 265.968 254.694C265.611 255.17 264.824 256.194 264.539 256.48C264.253 256.766 264.181 257.314 264.181 257.552V258.624C264.181 259.196 262.99 260.768 262.395 261.483C261.918 261.721 260.894 262.197 260.608 262.197C260.322 262.197 260.489 262.435 260.608 262.555C260.37 262.793 259.894 263.412 259.894 263.984C259.894 264.698 260.251 264.698 260.608 265.056C260.965 265.413 261.323 266.485 261.323 266.842C261.323 267.128 261.799 267.438 262.037 267.557V268.986C262.037 269.558 261.799 269.701 261.68 269.701C261.323 269.701 260.537 269.772 260.251 270.058C259.965 270.344 260.132 270.416 260.251 270.416L259.894 271.13C259.774 271.368 259.536 271.916 259.536 272.202V272.917C259.417 273.036 259.107 273.274 258.822 273.274H254.534C254.176 273.274 253.819 273.274 253.462 273.631C253.105 273.989 253.105 274.346 253.105 274.703V276.133C253.105 276.847 252.747 277.562 252.747 277.919C252.747 278.276 252.747 278.634 252.39 278.991C252.033 279.348 252.033 279.348 250.961 279.348C249.889 279.348 250.603 278.991 250.603 278.634C250.603 278.276 249.174 277.919 248.459 277.562C247.888 277.276 245.839 277.204 244.886 277.204L243.814 278.634L243.457 278.991C243.338 279.229 243.028 279.777 242.742 280.063C242.385 280.42 242.742 280.42 242.742 281.135C242.742 281.85 243.1 281.85 243.457 281.85C243.814 281.85 244.172 282.564 244.172 282.922C244.172 283.279 244.529 283.636 244.529 283.993C244.529 284.279 244.291 284.589 244.172 284.708C244.053 284.946 243.743 285.423 243.457 285.423C243.1 285.423 243.1 286.137 242.742 286.495C242.385 286.852 240.599 287.209 240.241 286.852C239.884 286.495 239.169 286.137 239.169 285.78C239.169 285.494 238.216 285.661 237.74 285.78L236.668 285.065C236.073 285.185 234.882 285.351 234.882 285.065C234.882 284.708 234.167 285.065 233.452 284.708C233.095 284.708 232.738 284.351 232.738 283.993C232.738 283.636 230.951 281.85 230.951 281.135C230.951 280.42 228.807 279.706 228.093 278.991C227.378 278.276 227.021 277.919 226.663 276.847C226.306 275.775 226.663 276.133 226.663 275.775C226.663 275.418 226.663 274.703 226.306 273.989C225.949 273.274 226.306 272.917 226.306 272.559V272.202C226.544 270.535 227.092 266.985 227.378 266.128C227.735 265.056 228.093 265.056 228.093 264.698C228.093 264.341 228.45 262.555 228.807 262.197C229.093 261.911 229.403 258.743 229.522 257.195L229.164 253.264H227.735C227.378 253.264 226.306 252.907 225.949 252.907C225.591 252.907 225.591 252.192 225.591 251.835C225.591 251.478 224.877 248.262 225.949 246.833C227.021 245.403 226.306 246.118 227.021 245.761C227.735 245.403 227.735 245.046 227.735 244.689C227.735 244.332 227.378 243.974 227.021 243.617C226.663 243.26 225.949 242.902 225.591 242.545C225.234 242.188 225.234 241.473 225.234 241.116V238.972C225.234 238.257 224.519 236.471 224.162 236.113C223.805 235.756 223.09 234.684 222.733 234.684C222.447 234.684 221.423 235.16 220.946 235.399C220.351 235.756 219.088 236.542 218.802 236.828C218.516 237.114 217.254 237.662 216.658 237.9L214.872 238.614L213.085 239.329C212.728 239.567 211.942 240.044 211.656 240.044C211.299 240.044 209.512 241.116 208.798 241.473C208.226 241.759 206.892 241.83 206.296 241.83L205.582 242.545C205.105 242.664 204.081 242.902 203.795 242.902C203.438 242.902 202.366 242.902 201.651 242.545C201.079 242.259 200.937 241.949 200.937 241.83C200.579 241.83 199.793 241.759 199.507 241.473C199.15 241.116 198.435 240.401 198.435 240.044C198.435 239.686 195.22 237.9 194.862 237.543C194.505 237.185 193.076 236.471 192.718 236.113C192.361 235.756 191.646 235.756 189.86 235.041C188.073 234.327 185.929 235.756 185.572 235.756C185.286 235.756 180.451 236.471 178.068 236.828L175.21 237.543H173.781C173.662 237.543 173.423 237.471 173.423 237.185C173.423 236.828 173.423 236.113 173.066 235.756C172.709 235.399 173.066 235.399 173.423 235.041C173.709 234.755 173.304 232.302 173.066 231.111C172.351 230.754 170.851 229.967 170.565 229.682C170.207 229.324 169.85 228.967 168.778 227.538C167.706 226.108 166.634 224.322 166.277 224.322C165.92 224.322 164.848 223.607 164.49 223.607C164.133 223.607 164.133 222.535 164.133 222.178C164.133 221.821 163.776 221.463 163.776 220.749C163.776 220.034 163.419 220.034 163.419 219.677C163.419 219.319 162.347 218.605 161.275 217.89C160.417 217.318 159.012 215.985 158.416 215.389H156.272H154.486C154.128 215.389 153.771 215.032 153.056 214.674C152.342 214.317 151.984 213.96 151.27 212.888C150.555 211.816 149.841 209.315 149.841 208.957C149.841 208.6 149.126 207.885 148.769 207.171C148.411 206.456 148.054 206.099 147.697 205.742C147.339 205.384 145.195 205.742 144.838 205.027C144.481 204.312 145.553 204.312 141.622 202.526C137.692 200.739 139.478 202.168 138.049 201.811C136.62 201.454 137.335 202.168 136.263 202.526C135.191 202.883 135.191 203.24 134.476 203.24C133.761 203.24 133.404 202.883 132.689 202.168C131.975 201.454 128.759 201.454 128.044 201.096C127.33 200.739 126.615 200.739 125.543 200.024C124.471 199.31 124.114 199.31 123.757 199.31C123.399 199.31 122.685 198.953 121.255 198.595C119.826 198.238 116.253 197.523 115.181 197.523C114.109 197.523 112.322 198.238 111.251 197.523C110.179 196.809 110.536 196.809 110.179 196.451C109.821 196.094 109.821 196.094 109.107 195.022C108.392 193.95 108.749 194.665 108.749 194.307V193.235C108.749 192.521 109.107 192.521 109.464 191.449C109.821 190.377 109.464 190.734 109.464 190.02C109.464 189.305 108.749 187.876 108.749 187.161C108.749 186.446 108.035 182.873 108.035 182.516C108.035 182.159 108.035 182.159 108.392 181.801C108.749 181.444 109.821 181.087 110.179 180.729C110.536 180.372 110.893 178.586 110.893 177.871C110.893 177.156 111.251 175.727 111.251 175.012C111.251 174.298 111.251 170.725 110.893 170.367C110.536 170.01 110.179 169.295 109.821 168.938C109.464 168.581 108.392 168.223 107.677 167.509C106.963 166.794 103.747 162.864 103.39 162.506C103.032 162.149 102.318 161.792 101.603 161.077C100.888 160.362 100.888 160.72 100.888 160.362C100.888 160.005 99.8164 159.648 99.1018 158.219C98.3872 156.789 97.6725 157.147 97.3152 156.075C96.9579 155.003 95.886 155.717 95.5287 155.36C95.1713 155.003 94.814 151.072 94.814 149.286C94.814 147.499 95.1713 148.571 95.1713 147.856C95.1713 147.142 95.5287 147.499 95.5287 147.142C95.5287 146.785 95.886 146.427 95.886 144.641V143.569C95.886 143.211 96.6006 142.139 96.6006 141.782C96.6006 141.425 97.6725 138.924 97.6725 137.137V136.065C97.6725 135.708 97.6725 134.993 98.0299 133.921C98.3872 132.849 98.3872 133.207 98.7445 132.849C99.1018 132.492 99.8164 129.276 100.174 128.561L100.888 127.132C101.246 126.418 100.888 126.775 100.888 126.418V123.559C100.888 123.202 100.174 122.844 100.174 122.487V121.415C100.174 121.058 100.531 120.701 100.531 119.986V116.77C100.531 116.484 99.8164 115.46 99.4591 114.983C97.9108 114.864 94.6711 114.698 94.0994 114.983C93.3848 115.341 94.0994 115.341 93.7421 115.341C93.4562 115.341 92.9083 115.817 92.6701 116.055H91.5982L91.2409 115.698V114.626V113.554C91.2409 112.84 90.8836 112.84 90.8836 112.482C90.8836 112.125 90.1689 109.624 90.1689 108.552C90.1689 107.48 90.1689 107.48 89.8116 106.765C89.4543 106.051 89.8116 106.408 89.4543 105.693C89.097 104.979 88.7397 104.264 89.8116 102.835C90.8836 101.406 90.1689 102.12 90.1689 101.763C90.1689 101.406 89.8116 101.048 89.097 100.334C88.3824 99.6189 89.097 99.6189 88.7397 97.8324C88.3824 96.0458 87.3104 94.6165 86.2385 92.83C85.1665 91.0434 85.8811 91.4007 86.2385 90.3288C86.5958 89.2568 86.9531 89.6141 87.3104 89.2568C87.6677 88.8995 87.6677 86.041 88.7397 84.969C89.5972 84.1115 89.3352 83.6589 89.097 83.5398C88.6206 83.4207 87.5963 82.8966 87.3104 81.7532C86.9531 80.3239 85.8811 78.18 85.8811 77.1081C85.8811 76.0361 86.5958 75.6788 86.5958 74.9642C86.5958 74.2496 86.5958 73.8923 85.5238 71.7484C84.4519 69.6045 80.5214 69.2472 79.8068 68.8899C79.0922 68.5325 76.591 68.5325 76.2336 68.1752C75.8763 67.8179 75.1617 67.8179 75.1617 67.4606C75.1617 67.1033 74.8044 66.746 74.4471 66.0313C74.0898 65.3167 72.6605 64.2448 70.5166 62.8155C68.3727 61.3862 65.8715 61.7435 65.5142 61.7435H62.2984C61.7267 61.7435 59.4398 61.5053 58.3679 61.3862C57.7724 61.0289 56.5813 60.0999 56.5813 59.2423V58.1704C56.3431 57.8131 55.7952 56.8841 55.5094 56.0265C55.1521 54.9546 55.1521 52.096 55.1521 49.2375C55.1521 46.379 54.7947 43.8778 54.4374 43.1632C54.0801 42.4485 53.7228 42.4485 53.3655 42.4485C53.0082 42.4485 50.8643 42.0912 49.435 40.3046C48.2916 38.8754 46.5765 37.5652 45.8619 37.0888C45.5046 36.6124 44.7899 35.5881 44.7899 35.3022V34.2303C44.7899 33.5157 44.7899 33.5157 44.0753 32.4437C43.3607 31.3718 43.0034 32.4437 41.9314 31.7291C40.8595 31.0145 40.5021 31.7291 39.4302 31.3718C38.3583 31.0145 38.7156 31.0145 38.3583 30.2998C38.0009 29.5852 38.3583 29.9425 38.7156 28.8706C39.0729 27.7986 38.7156 28.1559 38.7156 27.4413C38.7156 26.7267 38.7156 26.3694 38.3583 25.2974C38.0009 24.2255 36.929 23.5108 36.5717 22.4389C36.2144 21.367 33.3558 18.5084 32.9985 18.5084C32.6412 18.5084 32.2839 17.7938 31.5693 17.4365C30.8546 17.0792 29.4254 17.4365 28.7108 17.0792C28.139 16.7933 26.0904 16.9601 25.1376 17.0792C24.6612 17.3174 23.6369 17.7938 23.351 17.7938C22.9937 17.7938 22.6364 17.7938 21.9218 17.4365C21.2071 17.0792 21.5645 17.0792 20.8498 16.3645C20.1352 15.6499 19.7779 15.6499 19.4206 15.2926C19.0632 14.9353 18.7059 14.9353 17.9913 14.578C17.2767 14.2207 13.3462 13.1487 12.2743 12.0768C11.2023 11.0048 11.5596 11.0048 11.2023 10.2902C10.9165 9.71849 10.845 7.43167 10.845 6.35972C10.7259 6.59794 10.3448 7.14582 9.77306 7.43167C9.05843 7.78899 9.41574 7.78899 9.05827 8.1463C8.70079 8.50361 6.55722 8.86093 6.19991 8.86093C5.8426 8.86093 4.41334 9.21825 4.05602 8.86093C3.69871 8.50361 3.69871 9.21825 3.34139 8.86093L2.26928 7.78899C1.91197 7.43167 0.48271 6.71704 1.19734 5.64509C1.76904 5.07339 1.91197 5.16867 1.91197 5.28778C2.15018 5.28778 2.6266 5.35924 2.6266 5.64509C2.6266 5.93095 2.86481 6.47883 2.98391 6.71704C3.46033 6.83614 4.48464 7.07436 4.77049 7.07436C5.1278 7.07436 5.1278 6.71704 5.1278 6.35972C5.1278 6.00241 6.55706 6.00241 6.91438 6.00241C7.27169 6.00241 7.98632 5.28778 7.98632 4.93046C7.98632 4.57315 8.70095 3.85852 9.05827 3.5012C9.34412 3.21535 9.41558 2.66747 9.41558 2.42926Z"
          fill="#212529"
          stroke="#F58220"
          strokeWidth="0.5"
        />
        <g clipPath="url(#clip0_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M68.0003 41.5307C68.2831 41.5307 68.5543 41.4184 68.7543 41.2185C68.9543 41.0186 69.0668 40.7474 69.0669 40.4646C69.0669 40.1817 68.9545 39.9104 68.7545 39.7104C68.5545 39.5103 68.2832 39.3979 68.0003 39.3979C67.7174 39.3979 67.4461 39.5103 67.246 39.7104C67.046 39.9104 66.9336 40.1817 66.9336 40.4646C66.9337 40.7474 67.0462 41.0186 67.2462 41.2185C67.4462 41.4184 67.7175 41.5307 68.0003 41.5307Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M71.2008 40.4645C71.2008 43.1295 68.5341 44.7285 68.0008 44.7285C67.4674 44.7285 64.8008 43.1295 64.8008 40.4645C64.8012 39.6161 65.1386 38.8026 65.7386 38.2029C66.3387 37.6033 67.1524 37.2665 68.0008 37.2666C69.7677 37.2666 71.2008 38.6986 71.2008 40.4645Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip1_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M104 79.5307C104.283 79.5307 104.554 79.4184 104.754 79.2185C104.954 79.0186 105.067 78.7474 105.067 78.4646C105.067 78.1817 104.955 77.9104 104.755 77.7104C104.554 77.5103 104.283 77.3979 104 77.3979C103.717 77.3979 103.446 77.5103 103.246 77.7104C103.046 77.9104 102.934 78.1817 102.934 78.4646C102.934 78.7474 103.046 79.0186 103.246 79.2185C103.446 79.4184 103.717 79.5307 104 79.5307Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M107.201 78.4645C107.201 81.1295 104.534 82.7285 104.001 82.7285C103.467 82.7285 100.801 81.1295 100.801 78.4645C100.801 77.6161 101.139 76.8026 101.739 76.2029C102.339 75.6033 103.152 75.2665 104.001 75.2666C105.768 75.2666 107.201 76.6986 107.201 78.4645Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip2_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M93.0003 56.5307C93.2831 56.5307 93.5543 56.4184 93.7543 56.2185C93.9543 56.0186 94.0668 55.7474 94.0669 55.4646C94.0669 55.1817 93.9545 54.9104 93.7545 54.7104C93.5545 54.5103 93.2832 54.3979 93.0003 54.3979C92.7174 54.3979 92.4461 54.5103 92.246 54.7104C92.046 54.9104 91.9336 55.1817 91.9336 55.4646C91.9337 55.7474 92.0462 56.0186 92.2462 56.2185C92.4462 56.4184 92.7175 56.5307 93.0003 56.5307Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M96.2008 55.4645C96.2008 58.1295 93.5341 59.7285 93.0008 59.7285C92.4674 59.7285 89.8008 58.1295 89.8008 55.4645C89.8012 54.6161 90.1386 53.8026 90.7386 53.2029C91.3387 52.6033 92.1524 52.2665 93.0008 52.2666C94.7677 52.2666 96.2008 53.6986 96.2008 55.4645Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip3_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M159 83.5307C159.283 83.5307 159.554 83.4184 159.754 83.2185C159.954 83.0186 160.067 82.7474 160.067 82.4646C160.067 82.1817 159.955 81.9104 159.755 81.7104C159.554 81.5103 159.283 81.3979 159 81.3979C158.717 81.3979 158.446 81.5103 158.246 81.7104C158.046 81.9104 157.934 82.1817 157.934 82.4646C157.934 82.7474 158.046 83.0186 158.246 83.2185C158.446 83.4184 158.717 83.5307 159 83.5307Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M162.201 82.4645C162.201 85.1295 159.534 86.7285 159.001 86.7285C158.467 86.7285 155.801 85.1295 155.801 82.4645C155.801 81.6161 156.139 80.8026 156.739 80.2029C157.339 79.6033 158.152 79.2665 159.001 79.2666C160.768 79.2666 162.201 80.6986 162.201 82.4645Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip4_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M151 135.531C151.283 135.531 151.554 135.418 151.754 135.219C151.954 135.019 152.067 134.747 152.067 134.465C152.067 134.182 151.955 133.91 151.755 133.71C151.554 133.51 151.283 133.398 151 133.398C150.717 133.398 150.446 133.51 150.246 133.71C150.046 133.91 149.934 134.182 149.934 134.465C149.934 134.747 150.046 135.019 150.246 135.219C150.446 135.418 150.717 135.531 151 135.531Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M154.201 134.464C154.201 137.13 151.534 138.728 151.001 138.728C150.467 138.728 147.801 137.13 147.801 134.464C147.801 133.616 148.139 132.803 148.739 132.203C149.339 131.603 150.152 131.266 151.001 131.267C152.768 131.267 154.201 132.699 154.201 134.464Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip5_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M189 135.531C189.283 135.531 189.554 135.418 189.754 135.219C189.954 135.019 190.067 134.747 190.067 134.465C190.067 134.182 189.955 133.91 189.755 133.71C189.554 133.51 189.283 133.398 189 133.398C188.717 133.398 188.446 133.51 188.246 133.71C188.046 133.91 187.934 134.182 187.934 134.465C187.934 134.747 188.046 135.019 188.246 135.219C188.446 135.418 188.717 135.531 189 135.531Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M192.201 134.464C192.201 137.13 189.534 138.728 189.001 138.728C188.467 138.728 185.801 137.13 185.801 134.464C185.801 133.616 186.139 132.803 186.739 132.203C187.339 131.603 188.152 131.266 189.001 131.267C190.768 131.267 192.201 132.699 192.201 134.464Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip6_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M134 176.531C134.283 176.531 134.554 176.418 134.754 176.219C134.954 176.019 135.067 175.747 135.067 175.465C135.067 175.182 134.955 174.91 134.755 174.71C134.554 174.51 134.283 174.398 134 174.398C133.717 174.398 133.446 174.51 133.246 174.71C133.046 174.91 132.934 175.182 132.934 175.465C132.934 175.747 133.046 176.019 133.246 176.219C133.446 176.418 133.717 176.531 134 176.531Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M137.201 175.464C137.201 178.13 134.534 179.728 134.001 179.728C133.467 179.728 130.801 178.13 130.801 175.464C130.801 174.616 131.139 173.803 131.739 173.203C132.339 172.603 133.152 172.266 134.001 172.267C135.768 172.267 137.201 173.699 137.201 175.464Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip7_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M187 200.531C187.283 200.531 187.554 200.418 187.754 200.219C187.954 200.019 188.067 199.747 188.067 199.465C188.067 199.182 187.955 198.91 187.755 198.71C187.554 198.51 187.283 198.398 187 198.398C186.717 198.398 186.446 198.51 186.246 198.71C186.046 198.91 185.934 199.182 185.934 199.465C185.934 199.747 186.046 200.019 186.246 200.219C186.446 200.418 186.717 200.531 187 200.531Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M190.201 199.464C190.201 202.13 187.534 203.728 187.001 203.728C186.467 203.728 183.801 202.13 183.801 199.464C183.801 198.616 184.139 197.803 184.739 197.203C185.339 196.603 186.152 196.266 187.001 196.267C188.768 196.267 190.201 197.699 190.201 199.464Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip8_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M202 174.531C202.283 174.531 202.554 174.418 202.754 174.219C202.954 174.019 203.067 173.747 203.067 173.465C203.067 173.182 202.955 172.91 202.755 172.71C202.554 172.51 202.283 172.398 202 172.398C201.717 172.398 201.446 172.51 201.246 172.71C201.046 172.91 200.934 173.182 200.934 173.465C200.934 173.747 201.046 174.019 201.246 174.219C201.446 174.418 201.717 174.531 202 174.531Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M205.201 173.464C205.201 176.13 202.534 177.728 202.001 177.728C201.467 177.728 198.801 176.13 198.801 173.464C198.801 172.616 199.139 171.803 199.739 171.203C200.339 170.603 201.152 170.266 202.001 170.267C203.768 170.267 205.201 171.699 205.201 173.464Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip9_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M233 206.531C233.283 206.531 233.554 206.418 233.754 206.219C233.954 206.019 234.067 205.747 234.067 205.465C234.067 205.182 233.955 204.91 233.755 204.71C233.554 204.51 233.283 204.398 233 204.398C232.717 204.398 232.446 204.51 232.246 204.71C232.046 204.91 231.934 205.182 231.934 205.465C231.934 205.747 232.046 206.019 232.246 206.219C232.446 206.418 232.717 206.531 233 206.531Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M236.201 205.464C236.201 208.13 233.534 209.728 233.001 209.728C232.467 209.728 229.801 208.13 229.801 205.464C229.801 204.616 230.139 203.803 230.739 203.203C231.339 202.603 232.152 202.266 233.001 202.267C234.768 202.267 236.201 203.699 236.201 205.464Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip10_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M246 182.531C246.283 182.531 246.554 182.418 246.754 182.219C246.954 182.019 247.067 181.747 247.067 181.465C247.067 181.182 246.955 180.91 246.755 180.71C246.554 180.51 246.283 180.398 246 180.398C245.717 180.398 245.446 180.51 245.246 180.71C245.046 180.91 244.934 181.182 244.934 181.465C244.934 181.747 245.046 182.019 245.246 182.219C245.446 182.418 245.717 182.531 246 182.531Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M249.201 181.464C249.201 184.13 246.534 185.728 246.001 185.728C245.467 185.728 242.801 184.13 242.801 181.464C242.801 180.616 243.139 179.803 243.739 179.203C244.339 178.603 245.152 178.266 246.001 178.267C247.768 178.267 249.201 179.699 249.201 181.464Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip11_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M167 168.531C167.283 168.531 167.554 168.418 167.754 168.219C167.954 168.019 168.067 167.747 168.067 167.465C168.067 167.182 167.955 166.91 167.755 166.71C167.554 166.51 167.283 166.398 167 166.398C166.717 166.398 166.446 166.51 166.246 166.71C166.046 166.91 165.934 167.182 165.934 167.465C165.934 167.747 166.046 168.019 166.246 168.219C166.446 168.418 166.717 168.531 167 168.531Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M170.201 167.464C170.201 170.13 167.534 171.728 167.001 171.728C166.467 171.728 163.801 170.13 163.801 167.464C163.801 166.616 164.139 165.803 164.739 165.203C165.339 164.603 166.152 164.266 167.001 164.267C168.768 164.267 170.201 165.699 170.201 167.464Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip12_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M126 105.531C126.283 105.531 126.554 105.418 126.754 105.219C126.954 105.019 127.067 104.747 127.067 104.465C127.067 104.182 126.955 103.91 126.755 103.71C126.554 103.51 126.283 103.398 126 103.398C125.717 103.398 125.446 103.51 125.246 103.71C125.046 103.91 124.934 104.182 124.934 104.465C124.934 104.747 125.046 105.019 125.246 105.219C125.446 105.418 125.717 105.531 126 105.531Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M129.201 104.464C129.201 107.13 126.534 108.728 126.001 108.728C125.467 108.728 122.801 107.13 122.801 104.464C122.801 103.616 123.139 102.803 123.739 102.203C124.339 101.603 125.152 101.266 126.001 101.267C127.768 101.267 129.201 102.699 129.201 104.464Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <g clipPath="url(#clip13_5137_5859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M250 253.531C250.283 253.531 250.554 253.418 250.754 253.219C250.954 253.019 251.067 252.747 251.067 252.465C251.067 252.182 250.955 251.91 250.755 251.71C250.554 251.51 250.283 251.398 250 251.398C249.717 251.398 249.446 251.51 249.246 251.71C249.046 251.91 248.934 252.182 248.934 252.465C248.934 252.747 249.046 253.019 249.246 253.219C249.446 253.418 249.717 253.531 250 253.531Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M253.201 252.464C253.201 255.13 250.534 256.728 250.001 256.728C249.467 256.728 246.801 255.13 246.801 252.464C246.801 251.616 247.139 250.803 247.739 250.203C248.339 249.603 249.152 249.266 250.001 249.267C251.768 249.267 253.201 250.699 253.201 252.464Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </g>
        <defs>
          <clipPath id="clip0_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(64 37)"
            />
          </clipPath>
          <clipPath id="clip1_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(100 75)"
            />
          </clipPath>
          <clipPath id="clip2_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(89 52)"
            />
          </clipPath>
          <clipPath id="clip3_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(155 79)"
            />
          </clipPath>
          <clipPath id="clip4_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(147 131)"
            />
          </clipPath>
          <clipPath id="clip5_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(185 131)"
            />
          </clipPath>
          <clipPath id="clip6_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(130 172)"
            />
          </clipPath>
          <clipPath id="clip7_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(183 196)"
            />
          </clipPath>
          <clipPath id="clip8_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(198 170)"
            />
          </clipPath>
          <clipPath id="clip9_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(229 202)"
            />
          </clipPath>
          <clipPath id="clip10_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(242 178)"
            />
          </clipPath>
          <clipPath id="clip11_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(163 164)"
            />
          </clipPath>
          <clipPath id="clip12_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(122 101)"
            />
          </clipPath>
          <clipPath id="clip13_5137_5859">
            <rect
              width="8"
              height="8"
              fill="white"
              transform="translate(246 249)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default C52;
