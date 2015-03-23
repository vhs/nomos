<?php

namespace app\services;

use Aws\Ses\SesClient;
use StringTemplate\Engine;

class EmailService {

    function LoadTemplate($context, $tmpl, $type) {
        $engine = new Engine('{{','}}');
        $file = file_get_contents("../vhs/email/$tmpl.$type", true);
        return $engine->render($file, $context);
    }

    public function EmailUser($user, $subject, $tmpl, $context) {
        $html = $this->LoadTemplate($context, $tmpl, 'html');
        $txt = $this->LoadTemplate($context, $tmpl, 'txt');
        if(is_null($html) || is_null($txt)) {
            throw new \Exception("Unable to load e-mail template");
        }

        $client = SesClient::factory(array(
            'region' => AWS_SES_REGION,
            'credentials' => array(
                'key'      => AWS_SES_CLIENT_ID,
                'secret'   => AWS_SES_SECRET
            )
        ));

        $client->sendEmail(array(
            'Source' => MMP_FROM_EMAIL,
            'Destination' => array(
                'ToAddresses' => array($user->email),
            ),
            'Message' => array(
                'Subject' => array(
                    // Data is required
                    'Data' => $subject
                ),
                // Body is required
                'Body' => array(
                    'Text' => array(
                        // Data is required
                        'Data' => $txt
                    ),
                    'Html' => array(
                        // Data is required
                        'Data' => $html
                    ),
                ),
            ),
        ));

        return null;
    }
}