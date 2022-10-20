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

import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

    render() {
        const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;

        const fontUrl = "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;" +
            "0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap";

        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/favicon.png" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href={fontUrl}
                        rel="stylesheet" />
                    <meta httpEquiv='cache-control' content='no-cache' />
                    <meta httpEquiv='expires' content='0' />
                    <meta httpEquiv='pragma' content='no-cache' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
