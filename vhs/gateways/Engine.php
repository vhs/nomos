<?php

namespace vhs\gateways;

use vhs\Loggington;

/**
 * Gateways Engine.
 *
 * @method static \vhs\gateways\Engine getInstance()
 */
class Engine extends Loggington {
    /**
     * gatewayInstances.
     *
     * @var array<string,array<string,array<string,object|string>>>
     */
    private $gatewayInstances = [];

    /**
     * gatewaysPrefix.
     *
     * @var string
     */
    private $gatewaysPrefix = 'vhs\gateways';

    protected function __construct() {
        parent::__construct();

        $this->discover();
    }

    /**
     * Get the default gateway for a particular category and type.
     *
     * E.g. \vhs\gateways\Engine::getInstance()->getDefaultGateway('messages', 'email') will get the default email gateway.
     *
     * @param string $gatewayCategory
     * @param string $gatewayType
     *
     * @return object
     */
    public function getDefaultGateway($gatewayCategory, $gatewayType): object {
        if (!isset($this->gatewayInstances[$gatewayCategory][$gatewayType]['default'])) {
            throw new \Exception(sprintf('No default gateway found for %s - %s', $gatewayCategory, $gatewayType));
        }

        return $this->getNamedGateway($gatewayCategory, $gatewayType, $this->gatewayInstances[$gatewayCategory][$gatewayType]['default']);
    }

    /**
     * Get a named gateway implementation for a particular category and type.
     *
     * E.g. \vhs\gateways\Engine::getInstance()->getDefaultGateway('messages', 'email', 'AWSSESClient') will get the AWSSESClient.
     *
     * @param string $gatewayCategory
     * @param string $gatewayType
     * @param string $className
     *
     * @return object
     */
    public function getNamedGateway($gatewayCategory, $gatewayType, $className): object {
        if (!isset($this->gatewayInstances[$gatewayCategory][$gatewayType][$className])) {
            throw new \Exception(sprintf('No named gateway found for %s/%s/%s', $gatewayCategory, $gatewayType, $className));
        }

        return $this->gatewayInstances[$gatewayCategory][$gatewayType][$className];
    }

    /**
     * Set default gateway implementation for a particular category and type.
     *
     * I.e. \vhs\gateways\Engine::getInstance()->setDefaultGateway('messages', 'email', 'AWSSESClient') will set AWSSESClient as the default email gateway.
     *
     * @param string $gatewayCategory
     * @param string $gatewayType
     * @param string $className
     *
     * @return void
     */
    public function setDefaultGateway($gatewayCategory, $gatewayType, $className): void {
        if (!isset($this->gatewayInstances[$gatewayCategory][$gatewayType][$className])) {
            throw new \Exception(sprintf('No named gateway found for %s/%s/%s', $gatewayCategory, $gatewayType, $className));
        }

        $this->gatewayInstances[$gatewayCategory][$gatewayType]['default'] = $className;
    }

    /**
     * Magic auto-discovery and registration.
     *
     * @return void
     */
    protected function discover(): void {
        $gatewayFiles = $this->scanAllDir(__DIR__);

        foreach ($gatewayFiles as $gatewayFile) {
            $gatewayDefinition = explode(DIRECTORY_SEPARATOR, str_replace('.php', '', $gatewayFile));

            $this->register($gatewayDefinition[0], $gatewayDefinition[1], $gatewayDefinition[2]);
        }
    }

    /**
     * Automagically register a class instance of a gateway.
     *
     * @param mixed $gatewayCategory The top-level category. E.g. 'messages'
     * @param mixed $gatewayType     The sub-level type. E.g. 'email'
     * @param mixed $className       The class name of the actual implementation. E.g. 'AWSSESClient'
     * @param bool  $autoDefault     Whether to automatically set the class as the default handler for that category/type. Defaults to true.
     *
     * @return void
     */
    protected function register($gatewayCategory, $gatewayType, $className, $autoDefault = true): void {
        $interfacePath = sprintf('%s\interfaces\I%s%sGateway', $this->gatewaysPrefix, ucfirst($gatewayCategory), ucfirst($gatewayType));
        $classPath = sprintf('%s\%s\%s\%s', $this->gatewaysPrefix, $gatewayCategory, $gatewayType, $className);

        $gatewayClass = new \ReflectionClass($classPath);

        if (
            !in_array($interfacePath, $gatewayClass->getInterfaceNames()) &&
            !in_array(sprintf('%s\interfaces\IGateway', $this->gatewaysPrefix), $gatewayClass->getInterfaceNames())
        ) {
            throw new \Exception(
                sprintf(
                    'Gateway (%s) does not implement required interface %s. Found: [%s]',
                    $classPath,
                    $interfacePath,
                    implode(',', $gatewayClass->getInterfaceNames())
                )
            );
        }

        if ($gatewayClass->getParentClass()->getName() !== 'vhs\Loggington') {
            throw new \Exception(
                sprintf('Gateway (%s) does not extend vhs\Loggington. Found: [%s]', $classPath, $gatewayClass->getParentClass()->getName())
            );
        }

        $this->gatewayInstances[$gatewayCategory][$gatewayType][$className] = call_user_func(sprintf('%s::getInstance', $classPath));

        $this->gatewayInstances[$gatewayCategory][$gatewayType][$className]->setLogger($this->logger);

        if ($autoDefault && !isset($this->gatewayInstances[$gatewayCategory][$gatewayType]['default'])) {
            $this->gatewayInstances[$gatewayCategory][$gatewayType]['default'] = $className;
        }
    }

    /**
     * scanAllDir.
     *
     * @param string $scanDir
     *
     * @return string[]
     */
    private function scanAllDir($scanDir) {
        $result = [];

        foreach (scandir($scanDir) as $fileName) {
            if (!preg_match('/^(\.\.?|interfaces|Engine.php)/', $fileName)) {
                $filePath = $scanDir . DIRECTORY_SEPARATOR . $fileName;

                if (is_dir($filePath)) {
                    foreach ($this->scanAllDir($filePath) as $childFilename) {
                        $result[] = $fileName . DIRECTORY_SEPARATOR . $childFilename;
                    }
                } else {
                    $result[] = $fileName;
                }
            }
        }

        return $result;
    }
}
