<?php
require '../sql/conexion.php';  // Ajusta ruta según dónde esté tu config.php
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';
require '../PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Conexión a BD
// Asumo que en config.php tienes algo como:
// $conn = new mysqli($host, $user, $pass, $db);

$name    = isset($_POST['name']) ? $conn->real_escape_string($_POST['name']) : '';
$email   = isset($_POST['email']) ? $conn->real_escape_string($_POST['email']) : '';
$phone   = isset($_POST['phone']) ? $conn->real_escape_string($_POST['phone']) : '';
$people  = isset($_POST['people']) ? $conn->real_escape_string($_POST['people']) : '';
$evento  = isset($_POST['evento']) ? $conn->real_escape_string($_POST['evento']) : '';
$date    = isset($_POST['date']) ? $conn->real_escape_string($_POST['date']) : '';
$time    = isset($_POST['time']) ? $conn->real_escape_string($_POST['time']) : '';
$message = isset($_POST['message']) ? $conn->real_escape_string($_POST['message']) : '';

// Validar campos obligatorios
if(empty($name) || empty($email) || empty($phone) || empty($people) || empty($evento) || empty($date) || empty($time)){
    die("Por favor completa todos los campos obligatorios.");
}

// Insertar en la tabla reservacion (adaptar si los nombres de columna son distintos)
$sql = "INSERT INTO reservacion (nombre, email, telefono, invitados, tipo_evento, fecha, hora, comentarios)
        VALUES ('$name', '$email', '$phone', '$people', '$evento', '$date', '$time', '$message')";

if($conn->query($sql) === TRUE){
    // Preparar y enviar correo
    $mail = new PHPMailer(true);
    try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'yocelingarcia2110@gmail.com';      // Cambia aquí tu correo
    $mail->Password   = 'qfqe apsa rcbr hktq';              // Cambia aquí la contraseña o app password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('yocelingarcia2110@gmail.com', 'MunClub');
    $mail->addAddress($email, $name);
    $mail->Subject = 'Confirmacion de tu reservacion';

    // Indicar que el correo será HTML
    $mail->isHTML(true);

    $mail->Body = '
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Confirmación de Reservación</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0ece4; font-family: Helvetica, Arial, sans-serif;">
  <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1); margin-top: 30px;">
    <!-- Encabezado -->
    <tr>
      <td style="background-color: #4a2c20; padding: 30px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 28px;">🍽️ MunClub</h1>
        <p style="margin: 5px 0 0;">Confirmación de reservación</p>
      </td>
    </tr>

    <!-- Contenido principal -->
    <tr>
      <td style="padding: 30px; color: #333;">
        <p style="font-size: 16px;">Hola <strong>' . htmlspecialchars($name) . '</strong>,</p>
        <p style="font-size: 15px;">Tu reservación ha sido registrada exitosamente. A continuación los detalles:</p>

        <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 14px; border-spacing: 0;">
          <tr style="background-color: #f8f4f1;">
            <td style="font-weight: bold;">📅 Fecha:</td>
            <td>' . htmlspecialchars($date) . '</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">⏰ Hora:</td>
            <td>' . htmlspecialchars($time) . '</td>
          </tr>
          <tr style="background-color: #f8f4f1;">
            <td style="font-weight: bold;">👥 Personas:</td>
            <td>' . htmlspecialchars($people) . '</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">🎉 Tipo de evento:</td>
            <td>' . htmlspecialchars($evento) . '</td>
          </tr>
          <tr style="background-color: #f8f4f1;">
            <td style="font-weight: bold;">📝 Comentario:</td>
            <td>' . nl2br(htmlspecialchars($message)) . '</td>
          </tr>
        </table>

        <p style="margin-top: 20px;">Gracias por elegirnos. ¡Te esperamos para una experiencia inolvidable frente al mar!</p>
        <p style="margin: 10px 0;"><strong>MunClub · Beach Food & Drinks</strong></p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #4a2c20; color: #fff; text-align: center; font-size: 12px; padding: 15px;">
        © ' . date('Y') . ' MunClub. Todos los derechos reservados.
      </td>
    </tr>
  </table>
</body>
</html>
';


    $mail->send();
} catch (Exception $e) {
    echo "Error al enviar correo: {$mail->ErrorInfo}";
}

   // Preparar mensaje para WhatsApp
$mensaje = "NUEVA RESERVACIÓN\nNombre: $name\nCorreo: $email\nTeléfono: $phone\nPersonas: $people\nTipo de Evento: $evento\nFecha: $date\nHora: $time\nComentario: $message";
$numero = "522211258721"; // Número del dueño
$mensaje_url = urlencode($mensaje);
$link_wa = "https://wa.me/$numero?text=$mensaje_url";

echo '
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    Swal.fire({
      icon: "success",
      title: "¡Reservaci&oacute;n guardada con &eacute;xito!",
      text: "Redirigiendo a WhatsApp...",
      showConfirmButton: false,
      timer: 2500,
      background: "#fff",
      customClass: {
        title: "swal-title-custom",
        popup: "swal-popup-custom"
      }
    });

    setTimeout(function() {
      window.location.href = "'.$link_wa.'";
    }, 2500);
  });
</script>

<style>
  .swal-title-custom {
    font-family: "Segoe UI", sans-serif;
    font-size: 22px;
    font-weight: bold;
    color: #333;
  }

  .swal-popup-custom {
    border-radius: 12px;
    padding: 30px 20px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
</style>
';



} else {
    echo '
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al guardar la reservación: '.$conn->error.'"
      }).then(() => {
        window.history.back();
      });
    </script>';
}

$conn->close();
?>
