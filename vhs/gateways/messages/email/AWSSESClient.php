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

    public function sendRichEmail(string|array $to, string $subject, $textContent, $htmlContent): bool {
        try {
            $this->client->sendEmail([
                'Source' => NOMOS_FROM_EMAIL,
                'Destination' => [
                    'ToAddresses' => is_array($to) ? $to : [$to]
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
            $this->logger->log('An unknown error occured while trying to sendSimpleEmail: ' . $e->getMessage());

            return false;
        }
    }

    public function sendSimpleEmail(string|array $to, string $subject, $textContent): bool {
        try {
            $this->client->sendEmail([
                'Source' => NOMOS_FROM_EMAIL,
                'Destination' => [
                    'ToAddresses' => is_array($to) ? $to : [$to]
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
