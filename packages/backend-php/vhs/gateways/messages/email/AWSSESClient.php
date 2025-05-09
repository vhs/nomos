<?php

namespace vhs\gateways\messages\email;

use Aws\Ses\SesClient;
use vhs\gateways\interfaces\IMessagesEmailGateway;
use vhs\Loggington;

class AWSSESClient extends Loggington implements IMessagesEmailGateway {
    /**
     * Shared AWS SES client instance.
     *
     * @var \Aws\Ses\SesClient
     */
    private $client;

    protected function __construct() {
        parent::__construct();

        $this->client = new SesClient([
            'region' => AWS_SES_REGION,
            'credentials' => [
                'key' => AWS_SES_CLIENT_ID,
                'secret' => AWS_SES_SECRET
            ]
        ]);
    }

    public function health(): bool {
        return true;
    }

    /**
     * Send a rich (text+html) email.
     *
     * @param string|string[] $recipients  Recipient address or addresses array
     * @param string          $subject     Email subject
     * @param mixed           $textContent text content
     * @param mixed           $htmlContent html content
     *
     * @return bool
     */
    public function sendRichEmail(string|array $recipients, string $subject, $textContent, $htmlContent): bool {
        try {
            $this->client->sendEmail([
                'Source' => NOMOS_FROM_EMAIL,
                'Destination' => [
                    'ToAddresses' => is_array($recipients) ? $recipients : [$recipients]
                ],
                'Message' => [
                    'Subject' => [
                        // Data is required
                        'Data' => $subject
                    ],
                    // Body is required
                    'Body' => [
                        'Text' => [
                            // Data is required
                            'Data' => $textContent
                        ],
                        'Html' => [
                            // Data is required
                            'Data' => $htmlContent
                        ]
                    ]
                ]
            ]);

            return true;
        } catch (\Exception $e) {
            $this->logger->log('An unknown error occured while trying to sendRichEmail: ' . $e->getMessage());

            return false;
        }
    }

    /**
     * Send a simple (plain text) email.
     *
     * @param string|string[] $recipients  Recipient address or addresses array
     * @param string          $subject     Email subject
     * @param mixed           $textContent text content
     *
     * @return bool
     */
    public function sendSimpleEmail(string|array $recipients, string $subject, $textContent): bool {
        try {
            $this->client->sendEmail([
                'Source' => NOMOS_FROM_EMAIL,
                'Destination' => [
                    'ToAddresses' => is_array($recipients) ? $recipients : [$recipients]
                ],
                'Message' => [
                    'Subject' => [
                        // Data is required
                        'Data' => $subject
                    ],
                    // Body is required
                    'Body' => [
                        'Text' => [
                            // Data is required
                            'Data' => $textContent
                        ]
                    ]
                ]
            ]);

            return true;
        } catch (\Exception $e) {
            $this->logger->log('An unknown error occured while trying to sendSimpleEmail: ' . $e->getMessage());

            return false;
        }
    }
}
