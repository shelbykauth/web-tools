<?php
/**
 * Author Marie Kauth
 * 03/07/2017
 */
$company = 'Kauths.com';
$class = 'Company';
$args = [
        'id' => 'int', 
		'name' => 'string', 
		'address' => 'string', 
		'city' => 'string', 
		'state' => 'string', 
		'zip' => 'string', 
		'industry' => 'string', 
		'parentId' => 'string', 
		'status' => '\Status',
		'archived' => 'bool'
		];
$namespace = 'AppBundle\Model\;';

echo '<br>';

echo '/*<br>';
echo ' * (c) ' . $company . '<br>';
echo ' *<br>';
echo ' * For the full copyright and license information, please view the LICENSE<br>';
echo ' * file that was distributed with this source code.<br>';
echo ' */<br>';
echo 'namespace ' . $namespace . '<br>';
echo '<br>';
echo '/**<br>';
echo ' * @author Marie Kauth <marie.kauth@gmail.com><br>';
echo ' */<br>';
echo 'class ' . $class;
foreach ($args as $arg => $type) {
	echo '<br>';
	echo '&nbsp;&nbsp;&nbsp;&nbsp;/** @param ' . $type . ' $' . $arg . ' */<br>';
	echo '&nbsp;&nbsp;&nbsp;&nbsp;private $' . $arg . ';<br>';
	echo '<br>';
}
foreach ($args as $arg => $type) {
    echo '<br>';
    echo '&nbsp;&nbsp;&nbsp;&nbsp;/**<br>';
    echo '&nbsp;&nbsp;&nbsp;&nbsp; * @return ' . $type . '<br>';
    echo '&nbsp;&nbsp;&nbsp;&nbsp; */<br>';
	if ($type === 'bool' || $type === 'boolean') {
        echo '&nbsp;&nbsp;&nbsp;&nbsp;public function is' . ucfirst($arg) . '()<br>';
	} else {
        echo '&nbsp;&nbsp;&nbsp;&nbsp;public function get' . ucfirst($arg) . '()<br>';
	}
    echo '&nbsp;&nbsp;&nbsp;&nbsp;{<br>';
    echo '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return $this->' . $arg . ';<br>';
    echo '&nbsp;&nbsp;&nbsp;&nbsp}<br>';
    echo '<br>';
    echo '&nbsp;&nbsp;&nbsp;&nbsp;/**<br>';
    echo '&nbsp;&nbsp;&nbsp;&nbsp; * @param ' . $type . ' $' . $arg . '<br>';
    echo '&nbsp;&nbsp;&nbsp;&nbsp; */<br>';
    echo '&nbsp;&nbsp;&nbsp;&nbsp;public function set' . ucfirst($arg) . '($' . $arg . ')<br>';
    echo '&nbsp;&nbsp;&nbsp;&nbsp;{<br>';
    echo '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp$this->' . $arg . ' = $' . $arg . ';<br>';
    echo '&nbsp;&nbsp;&nbsp;&nbsp;}<br>';	
}
