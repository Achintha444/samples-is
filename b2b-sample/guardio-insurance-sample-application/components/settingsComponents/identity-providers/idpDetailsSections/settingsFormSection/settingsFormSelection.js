import CopyIcon from '@rsuite/icons/Copy';
import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { InputGroup, useToaster } from 'rsuite';
import FormSuite from 'rsuite/Form';
import { copyTheTextToClipboard, ENTERPRISE_ID, FACEBOOK_ID, GOOGLE_ID } from '../../../../../util/util/common/common';
import enterpriseFederatedAuthenticators from '../../../../data/templates/enterprise-identity-provider.json';
import facebookFederatedAuthenticators from '../../../../data/templates/facebook.json';
import googleFederatedAuthenticators from '../../../../data/templates/google.json';
import { infoTypeDialog } from '../../../../util/dialog';
import HelperText from '../../../../util/helperText';

export default function SettingsFormSelection(props) {

    const [federatedAuthenticators, setFederatedAuthenticators] = useState(props.federatedAuthenticators);
    const toaster = useToaster();

    const propList = () => {
        switch (props.templateId) {
            case GOOGLE_ID:
                return googleFederatedAuthenticators.idp.federatedAuthenticators.authenticators[0].properties;
            case FACEBOOK_ID:
                return facebookFederatedAuthenticators.idp.federatedAuthenticators.authenticators[0].properties;
            case ENTERPRISE_ID:
                return enterpriseFederatedAuthenticators.idp.federatedAuthenticators.authenticators[0].properties;
        }
    };

    const selectedValue = (key) => {
        return federatedAuthenticators.filter((obj) => obj.key === key)[0].value;
    }

    const copyValueToClipboard = (text) => {
        copyTheTextToClipboard(text);
        infoTypeDialog(toaster, "Text copied to clipboard")
    }

    return (
        <>
            {
                propList().map((prop) => (
                    <Field
                        key={prop.key}
                        name={prop.key}
                        initialValue={selectedValue(prop.key)}
                        render={({ input, meta }) => (
                            <FormSuite.Group controlId={prop.key}>
                                <FormSuite.ControlLabel>{prop.displayName}</FormSuite.ControlLabel>
                                <InputGroup inside style={{ width: "100%" }}>

                                    <FormSuite.Control
                                        readOnly={prop.readOnly ? prop.readOnly : false}
                                        {...input}
                                    />

                                    {
                                        prop.readOnly
                                            ? <InputGroup.Button
                                                onClick={() => copyValueToClipboard(selectedValue(prop.key))}>
                                                <CopyIcon />
                                            </InputGroup.Button>
                                            : <></>
                                    }

                                </InputGroup>
                                <HelperText
                                    text={prop.description} />

                                {meta.error && meta.touched && <FormSuite.ErrorMessage show={true} >
                                    {meta.error}
                                </FormSuite.ErrorMessage>}

                            </FormSuite.Group>
                        )}
                    />
                ))
            }
        </>
    )
}
