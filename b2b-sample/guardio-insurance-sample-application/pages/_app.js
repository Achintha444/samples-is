/*
 * Copyright (c) 2022 WSO2 LLC. (http://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *http://www.apache.org/licenses/LICENSE-2.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 import { SessionProvider } from "next-auth/react";
 import Head from "next/head";
 import "rsuite/dist/rsuite.min.css";
 import '../styles/globals.css';
 import '../styles/custom-theme.less';
 import config from '../config.json';
 import {
	 Chart as ChartJS,
	 CategoryScale,
	 LinearScale,
	 BarElement,
	 PointElement,
	 LineElement,
	 Title,
	 Tooltip,
	 Legend,
	 ArcElement,
	 RadialLinearScale,
 } from 'chart.js';
 
 function MyApp({ Component, pageProps }) {
 
	 ChartJS.register(
		 CategoryScale,
		 LinearScale,
		 BarElement,
		 PointElement,
		 LineElement,
		 ArcElement,
		 RadialLinearScale,
		 Title,
		 Tooltip,
		 Legend
	 );
 
	 return (
		 <SessionProvider session={pageProps?.session}>
			 <Head>
				 <title>{config.CUSTOMIZATION.name}</title>
				 <meta name="description" content={config.CUSTOMIZATION.name} />
			 </Head>
 
			 <Component {...pageProps} />
		 </SessionProvider>
	 )
 }
 
 export default MyApp;
 