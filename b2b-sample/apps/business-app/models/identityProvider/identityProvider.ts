/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
interface FederatedAuthenticatorForIdentityProvider {
    defaultAuthenticatorId : string,
    [key: string]: any,
}

export interface IdentityProvider {
    id: string,
    name: string,
    image : string,
    description : string,
    federatedAuthenticators: [FederatedAuthenticatorForIdentityProvider],
    [key: string]: any,
}

export interface AllIdentityProvidersIdentityProvider {
    id: string,
    [key: string]: any
}

export interface AllIdentityProviders {
    count: number
    identityProviders: [AllIdentityProvidersIdentityProvider]
    totalResults: number,
    [key: string]: any
}

export interface FederatedAuthenticatorsProperty {
    key: string,
    value: string
}

export interface FederatedAuthenticators {
    authenticatorId: string,
    name: string,
    properties: [FederatedAuthenticatorsProperty],
    [key: string]: any,

}