import React, {useState, useEffect} from "react";
import $ from 'jquery';

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function LoadingPaws(props) {

    return (<svg {...props} viewBox="0 0 229.708 229.711" xmlns="http://www.w3.org/2000/svg">
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z"/>
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z" transform="matrix(0.917997, 0.396587, -0.396587, 0.917997, 54.968746, -36.124798)"/>
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z" transform="matrix(0.689387, 0.724393, -0.724393, 0.689387, 118.873543, -47.511707)"/>
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z" transform="matrix(0.369306, 0.929308, -0.929308, 0.369306, 179.167603, -34.279633)"/>
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z" transform="matrix(0.001422, 0.999999, -0.999999, 0.001422, 229.53447, -0.142894)"/>
        <path d="M 30.365 118.628 C 28.725 120.569 26.176 121.308 24.672 120.28 C 23.167 119.251 23.277 116.844 24.916 114.903 C 26.556 112.962 29.105 112.222 30.61 113.251 C 32.114 114.279 32.005 116.686 30.365 118.628 Z M 26.497 109.892 C 24.98 112.16 22.266 113.195 20.437 112.204 C 18.607 111.213 18.355 108.572 19.873 106.304 C 21.39 104.037 24.104 103.002 25.933 103.993 C 27.763 104.983 28.015 107.625 26.497 109.892 Z M 16.35 105.342 C 16.08 108.034 14.223 110.084 12.202 109.92 C 10.182 109.756 8.762 107.44 9.032 104.748 C 9.302 102.055 11.159 100.005 13.18 100.169 C 15.201 100.333 16.62 102.649 16.35 105.342 Z M 7.569 111.524 C 7.751 114.052 6.207 116.146 4.12 116.201 C 2.034 116.256 0.195 114.252 0.014 111.724 C -0.168 109.196 1.376 107.102 3.462 107.047 C 5.549 106.992 7.387 108.997 7.569 111.524 Z M 4.002 119.464 C 7.952 118.454 12.042 115.01 13.761 113.387 C 15.161 111.331 17.998 112.816 18.547 114.726 C 19.225 117.318 21.036 121.423 22.435 122.901 C 27.51 127.968 22.538 130.153 20.293 129.238 C 16.998 127.495 8.53 125.872 5.395 125.87 C 2.034 125.204 1.271 120.163 4.002 119.464 Z" transform="matrix(-0.395849, 0.918316, -0.918316, -0.395849, 265.773071, 54.86861)"/>
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z" transform="matrix(-0.723839, 0.689969, -0.689969, -0.723839, 277.212769, 118.76339)"/>
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z" transform="matrix(-0.929011, 0.370052, -0.370052, -0.929011, 264.029114, 179.068161)"/>
        <path d="M 30.365 118.628 C 28.725 120.569 26.176 121.308 24.672 120.28 C 23.167 119.251 23.277 116.844 24.916 114.903 C 26.556 112.962 29.105 112.222 30.61 113.251 C 32.114 114.279 32.005 116.686 30.365 118.628 Z M 26.497 109.892 C 24.98 112.16 22.266 113.195 20.437 112.204 C 18.607 111.213 18.355 108.572 19.873 106.304 C 21.39 104.037 24.104 103.002 25.933 103.993 C 27.763 104.983 28.015 107.625 26.497 109.892 Z M 16.35 105.342 C 16.08 108.034 14.223 110.084 12.202 109.92 C 10.182 109.756 8.762 107.44 9.032 104.748 C 9.302 102.055 11.159 100.005 13.18 100.169 C 15.201 100.333 16.62 102.649 16.35 105.342 Z M 7.569 111.524 C 7.751 114.052 6.207 116.146 4.12 116.201 C 2.034 116.256 0.195 114.252 0.014 111.724 C -0.168 109.196 1.376 107.102 3.462 107.047 C 5.549 106.992 7.387 108.997 7.569 111.524 Z M 4.002 119.464 C 7.952 118.454 12.042 115.01 13.761 113.387 C 15.161 111.331 17.998 112.816 18.547 114.726 C 19.225 117.318 21.036 121.423 22.435 122.901 C 27.51 127.968 22.538 130.153 20.293 129.238 C 16.998 127.495 8.53 125.872 5.395 125.87 C 2.034 125.204 1.271 120.163 4.002 119.464 Z" transform="matrix(-0.999998, 0.002226, -0.002226, -0.999998, 229.930939, 229.46228)"/>
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z" transform="matrix(-0.917074, -0.398716, 0.398716, -0.917074, 174.358307, 265.981506)"/>
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z" transform="matrix(-0.687704, -0.725991, 0.725991, -0.687704, 110.427216, 277.220093)"/>
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z" transform="matrix(-0.367148, -0.930163, 0.930163, -0.367148, 50.163986, 263.848114)"/>
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z" transform="matrix(0.000899, -1, 1, 0.000899, -0.123513, 229.594574)"/>
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z" transform="matrix(0.397979, -0.917395, 0.917395, 0.397979, -36.235741, 174.500092)"/>
        <path d="M 30.365 118.628 C 28.725 120.569 26.176 121.308 24.672 120.28 C 23.167 119.251 23.277 116.844 24.916 114.903 C 26.556 112.962 29.105 112.222 30.61 113.251 C 32.114 114.279 32.005 116.686 30.365 118.628 Z M 26.497 109.892 C 24.98 112.16 22.266 113.195 20.437 112.204 C 18.607 111.213 18.355 108.572 19.873 106.304 C 21.39 104.037 24.104 103.002 25.933 103.993 C 27.763 104.983 28.015 107.625 26.497 109.892 Z M 16.35 105.342 C 16.08 108.034 14.223 110.084 12.202 109.92 C 10.182 109.756 8.762 107.44 9.032 104.748 C 9.302 102.055 11.159 100.005 13.18 100.169 C 15.201 100.333 16.62 102.649 16.35 105.342 Z M 7.569 111.524 C 7.751 114.052 6.207 116.146 4.12 116.201 C 2.034 116.256 0.195 114.252 0.014 111.724 C -0.168 109.196 1.376 107.102 3.462 107.047 C 5.549 106.992 7.387 108.997 7.569 111.524 Z M 4.002 119.464 C 7.952 118.454 12.042 115.01 13.761 113.387 C 15.161 111.331 17.998 112.816 18.547 114.726 C 19.225 117.318 21.036 121.423 22.435 122.901 C 27.51 127.968 22.538 130.153 20.293 129.238 C 16.998 127.495 8.53 125.872 5.395 125.87 C 2.034 125.204 1.271 120.163 4.002 119.464 Z" transform="matrix(0.725438, -0.688287, 0.688287, 0.725438, -47.525993, 110.577301)"/>
        <path d="M 30.366 118.628 C 28.726 120.569 26.177 121.308 24.673 120.28 C 23.168 119.251 23.278 116.844 24.917 114.903 C 26.557 112.962 29.106 112.222 30.611 113.251 C 32.115 114.279 32.006 116.686 30.366 118.628 Z M 26.498 109.892 C 24.981 112.16 22.267 113.195 20.438 112.204 C 18.608 111.213 18.356 108.572 19.874 106.304 C 21.391 104.037 24.105 103.002 25.934 103.993 C 27.764 104.983 28.016 107.625 26.498 109.892 Z M 16.351 105.342 C 16.081 108.034 14.224 110.084 12.203 109.92 C 10.183 109.756 8.763 107.44 9.033 104.748 C 9.303 102.055 11.16 100.005 13.181 100.169 C 15.202 100.333 16.621 102.649 16.351 105.342 Z M 7.57 111.524 C 7.752 114.052 6.208 116.146 4.121 116.201 C 2.035 116.256 0.196 114.252 0.015 111.724 C -0.167 109.196 1.377 107.102 3.463 107.047 C 5.55 106.992 7.388 108.997 7.57 111.524 Z M 4.003 119.464 C 7.953 118.454 12.043 115.01 13.762 113.387 C 15.162 111.331 17.999 112.816 18.548 114.726 C 19.226 117.318 21.037 121.423 22.436 122.901 C 27.511 127.968 22.539 130.153 20.294 129.238 C 16.999 127.495 8.531 125.872 5.396 125.87 C 2.035 125.204 1.272 120.163 4.003 119.464 Z" transform="matrix(0.929867, -0.367896, 0.367896, 0.929867, -34.202209, 50.30415)"/>
    </svg>);
}

export default LoadingPaws;