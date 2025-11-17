<?php

namespace vhs;

/** @typescript */
class SplClassLoaderItem {
    /**
     * file extension.
     *
     * @var mixed
     */
    public $fileExtension;

    /**
     * include path.
     *
     * @var mixed
     */
    public $includePath;

    /**
     * namespace.
     *
     * @var mixed
     */
    public $namespace;

    /**
     * __construct.
     *
     * @param string|null $namespace
     * @param string|null $includePath
     * @param string      $fileExtension
     *
     * @return void
     */
    public function __construct($namespace = null, $includePath = null, $fileExtension = '.php') {
        $this->namespace = $namespace;
        $this->includePath = $includePath;
        $this->fileExtension = $fileExtension;
    }
}

/** @typescript */
class SplClassLoader {
    /**
     * namespace items.
     *
     * @var array<string,mixed>
     */
    private $_items = [];

    /**
     * namespace separator.
     *
     * @var string
     */
    private $_namespaceSeparator = '\\';

    protected function __construct() {
    }

    /**
     * getInstance.
     *
     * @return \vhs\SplClassLoader
     */
    final public static function getInstance() {
        static $aoInstance = [];

        if (!isset($aoInstance['SplClassLoader'])) {
            $aoInstance['SplClassLoader'] = new SplClassLoader();
        }

        return $aoInstance['SplClassLoader'];
    }

    /**
     * add a new item.
     *
     * @param \vhs\SplClassLoaderItem $item
     *
     * @return void
     */
    public function add(SplClassLoaderItem $item) {
        $this->_items[$item->namespace] = $item;
        $this->register();
    }

    /**
     * Gets the namespace separator used by classes in the namespace of this class loader.
     *
     * @return string
     */
    public function getNamespaceSeparator() {
        return $this->_namespaceSeparator;
    }

    /**
     * Loads the given class or interface.
     *
     * @param string $className the name of the class to load
     *
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

            require ($item->includePath !== null ? $item->includePath . DIRECTORY_SEPARATOR : '') . $fileName;
        }
    }

    /**
     * Installs this class loader on the SPL autoload stack.
     *
     * @return void
     */
    public function register() {
        spl_autoload_register([$this, 'loadClass']);
    }

    /**
     * remove an item.
     *
     * @param string $namespace
     *
     * @return void
     */
    public function remove($namespace) {
        if (array_key_exists($namespace, $this->_items)) {
            unset($this->_items[$namespace]);
        }
    }

    /**
     * Sets the namespace separator used by classes in the namespace of this class loader.
     *
     * @param string $sep the separator to use
     *
     * @return void
     */
    public function setNamespaceSeparator($sep) {
        $this->_namespaceSeparator = $sep;
    }

    /**
     * Uninstalls this class loader from the SPL autoloader stack.
     *
     * @return void
     */
    public function unregister() {
        spl_autoload_unregister([$this, 'loadClass']);
    }

    /**
     * __clone.
     *
     * @return void
     */
    public function __clone(): void {
    }
}
