<?php
/*
 * (c) Kauths.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
//use AppBundle/Controller;

include_once('../AppBundle/Controller/ModelController.php');

$modelController = new ModelController();

$company = isset($_POST['company']) ? $_POST['company'] : null;
$model = isset($_POST['model']) ? $_POST['model'] : null;
$namespace = isset($_POST['namespace']) ? $_POST['namespace'] : null;
$arg_name = isset($_POST['arg_name']) ? $_POST['arg_name'] : null;
$arg_type = isset($_POST['arg_type']) ? $_POST['arg_type'] : null;

/*
 * Here only to work with sample from link
 * This would not be in final
 */

 if (!$company && isset($_GET['company'])) {
     $company = $_GET['company'];
 }
 
  if (!$model && isset($_GET['model'])) {
     $model = $_GET['model'];
 }
 
  if (!$namespace && isset($_GET['namespace'])) {
     $namespace = $_GET['namespace'];
 }
 
  if (!$arg_name && isset($_GET['arg_name'])) {
     $arg_name = $_GET['arg_name'];
 }
 
  if (!$arg_type && isset($_GET['arg_type'])) {
     $arg_type = $_GET['arg_type'];
 }
 
$args = [];

if (count($arg_name) > 0 && count($arg_type) > 0) {
	$i = 0;
	
	while ($i < count($arg_name)) {
		$args[$arg_name[$i]] = $arg_type[$i];
		$i++;
	}
}

echo $modelController->write($company, $model, $args, $namespace);
