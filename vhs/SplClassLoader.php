<?php

namespace vhs;

class SplClassLoaderItem {
    public $fileExtension;
    public $namespace;
    public $includePath;

    public function __construct($namespace = null, $includePath = null, $fileExtension = '.php') {
        $this->namespace = $namespace;
        $this->includePath = $includePath;
        $this->fileExtension = $fileExtension;
    }
}

class SplClassLoader {
    private $_namespaceSeparator = '\\';

    private $_items = [];

    protected function __construct() {
    }

    final public static function getInstance() {
        static $aoInstance = [];

        if (!isset($aoInstance['SplClassLoader'])) {
            $aoInstance['SplClassLoader'] = new SplClassLoader();
        }

        return $aoInstance['SplClassLoader'];
    }

    final private function __clone() {
    }

    /**
     * Sets the namespace separator used by classes in the namespace of this class loader.
     *
     * @param string $sep The separator to use.
     */
    public function setNamespaceSeparator($sep) {
        $this->_namespaceSeparator = $sep;
    }

    /**
     * Gets the namespace separator used by classes in the namespace of this class loader.
     *
     * @return string
     */
    public function getNamespaceSeparator() {
        return $this->_namespaceSeparator;
    }

    public function add(SplClassLoaderItem $item) {
        $this->_items[$item->namespace] = $item;
        $this->register();
    }

    public function remove($namespace) {
        if (array_key_exists($namespace, $this->_items)) {
            unset($this->_items[$namespace]);
        }
    }

    /**
     * Installs this class loader on the SPL autoload stack.
     */
    public function register() {
        spl_autoload_register([$this, 'loadClass']);
    }

    /**
     * Uninstalls this class loader from the SPL autoloader stack.
     */
    public function unregister() {
        spl_autoload_unregister([$this, 'loadClass']);
    }

    /**
     * Loads the given class or interface.
     *
     * @param string $className The name of the class to load.
     * @return void
     */
    public function loadClass($className) {
        if (count($this->_items) > 0) {
            $ns = explode($this->_namespaceSeparator, $className);

            if (count($ns) <= 1) {
                return;
            }

            array_pop($ns);
            $c = count($ns);
            $key = null;
            for ($i = 0; $i < $c; $i++) {
                $key = implode($this->_namespaceSeparator, $ns);
                if (array_key_exists($key, $this->_items)) {
                    break;
                } else {
                    $key = null;
                }
                array_pop($ns);
            }

            if ($key == null) {
                return;
            }

            $item = $this->_items[$key];

            $fileName = '';
            if (false !== ($lastNsPos = strripos($className, $this->_namespaceSeparator))) {
                $namespace = substr($className, 0, $lastNsPos);
                $className = substr($className, $lastNsPos + 1);
                $fileName = str_replace($this->_namespaceSeparator, DIRECTORY_SEPARATOR, $namespace) . DIRECTORY_SEPARATOR;
            }

            $fileName .= str_replace('_', DIRECTORY_SEPARATOR, $className) . $item->fileExtension;

            //print ($item->includePath !== null ? $item->includePath . DIRECTORY_SEPARATOR : '') . $fileName;
            require ($item->includePath !== null ? $item->includePath . DIRECTORY_SEPARATOR : '') . $fileName;
        }
    }
}
