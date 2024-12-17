import { Box, Modal, Typography } from '@mui/material'
import React from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Agreement = (props) => {

    const handleClose = () => {
        props.handleVisibility(false);
    }

  return (
    <Modal
        open={props.visibility}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={{
                ...style,
                maxHeight: "80vh",
                overflowY: "auto",
                padding: 2,
            }}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
                Terms and Conditions
            </Typography>
            
            <ol>
            <br />
        <li>
            <strong>Acceptance of Terms:</strong> By registering for and using our personalized news recommendation system – Informed Pulse, you agree to abide by these Terms and Conditions. If you do not agree, please refrain from using our service.
        </li><br />
        <li>
            <strong>Data Collection and Use:</strong>
            <ol type='a'>
                <li><strong>Personal Data:</strong> We collect and process personal information, such as your name, date of birth, email address, and interests, to provide personalized news recommendations.</li>
                <li><strong>Behavioral Data:</strong> We may collect information about your usage patterns, including clicks, preferences, and time spent on the platform, to improve our service.</li>
                <li><strong>Third-Party Integration:</strong> Certain data may be shared with third-party service providers to deliver and optimize the service.</li>
            </ol>
        </li><br />
        <li>
            <strong>Privacy Policy:</strong> Your data will be processed in accordance with our Privacy Policy, which explains how we collect, use, and protect your information. By agreeing to these terms, you consent to the terms outlined in the Privacy Policy.
        </li><br />
        <li>
            <strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account will be deemed as your responsibility.
        </li><br />
        <li>
            <strong>Prohibited Activities:</strong> You agree not to:
            <ol type='a'>
                <li>Use the system for unlawful purposes or to promote illegal activities.</li>
                <li>Distribute harmful content, such as viruses or malware, through the platform.</li>
                <li>Attempt to reverse-engineer, hack, or misuse the platform in any way.</li>
            </ol>
        </li><br />
        <li>
            <strong>Accuracy of Recommendations:</strong> We aim to provide accurate and personalized recommendations, but we do not guarantee the completeness or accuracy of the news content provided. The information is curated from external sources and may contain errors or inaccuracies.
        </li><br />
        <li>
            <strong>Intellectual Property:</strong> The content and design of the system, including proprietary algorithms, are protected by intellectual property laws. You may not copy, modify, or distribute any part of the platform without prior written consent.
        </li><br />
        <li>
            <strong>Limitation of Liability:</strong> We are not liable for any damages arising from your use of the system, including but not limited to loss of data, inaccuracies in recommendations, or system outages.
        </li><br />
        <li>
            <strong>Updates to Terms:</strong> We reserve the right to update these Terms and Conditions at any time. Significant changes will be communicated to you, and continued use of the service constitutes acceptance of the revised terms.
        </li><br />
        <li>
            <strong>Governing Law:</strong> These terms are governed by and construed in accordance with the laws of the European Union. Disputes arising out of or related to these terms will be resolved in Finland.
        </li><br />
        <li>
            <strong>Contact Information:</strong> For questions or concerns about these Terms and Conditions, please contact us at info@informedpulse.com.
        </li><br />
    </ol>
        
        </Box>
    </Modal>
  )
}

export default Agreement
