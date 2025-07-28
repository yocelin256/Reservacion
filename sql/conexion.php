
<?php 
$host = 'localhost';
$user = 'root';
$pass = '12345'; // asegúrate de que esta sea la contraseña correcta
$db   = 'reservacion'; // este es el nombre correcto de la base de datos

$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) { 
    die('Error en la conexión: ' . $conn->connect_error);
}  
?>
