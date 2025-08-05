<?php
require '../sql/conexion.php'; 

$mensaje = strtolower(trim($_POST['mensaje']));

// Palabras clave por categoría
$respuestas = [
    "saludo" => [
        "palabras" => ["hola", "buenas", "hey", "holi", "qué tal", "buen día", "buenos días", "buenas tardes", "buenas noches"],
        "respuesta" => "¡Hola! ¿En qué puedo ayudarte?"
    ],
    "horario" => [
        "palabras" => ["horario", "hora", "abren", "cierran", "a qué hora", "a qué horas", "cuándo abren", "cuándo cierran", "horas de atención"],
        "respuesta" => "Nuestro horario es de lunes a domingo de 11:00 AM a 6:00 PM."
    ],
    "ubicacion" => [
        "palabras" => ["ubicación", "dónde", "dirección", "local", "cómo llegar", "en dónde están", "ubicados"],
        "respuesta" => "Estamos ubicados en Boulevard Barra Vieja KM 31, San Andrés Playa Encantada, Gro."
    ],
    "reservacion" => [
        "palabras" => ["reservar", "reserva", "reservación", "apartado", "apartar", "hacer reservación", "quiero reservar"],
        "respuesta" => "Puedes hacer tu reserva directamente en la sección de 'Reservación'."
    ],
    "agradecimiento" => [
        "palabras" => ["gracias", "muchas gracias", "mil gracias", "te lo agradezco", "gracias totales", "se agradece"],
        "respuesta" => "¡De nada! Te esperamos pronto 😊"
    ],
    "contacto" => [
    "palabras" => ["contacto", "teléfono", "número", "cómo los contacto", "cómo comunicarme", "hablar con alguien", "whatsapp", "mandar mensaje", "me puedo comunicar", "para contactarlos"],
    "respuesta" => "¡Claro! Puedes comunicarte con nosotros al número: +52 221 125 8721 📞"
    ],
    "evento" => [
    "palabras" => ["evento"],
    "respuesta" => "Próximos eventos en agosto: 9 DJ Ithay, 10 DJ Black Factor, 16 DJ Ithay y 17 Twisted Sisters. ¡Síguenos para no perderte nada! 🎉✨"
    ],

];

$respuesta = "Lo siento, no entendí tu mensaje. ¿Podrías reformularlo?";

foreach ($respuestas as $categoria) {
    foreach ($categoria["palabras"] as $palabra) {
        if (strpos($mensaje, $palabra) !== false) {
            $respuesta = $categoria["respuesta"];
            break 2; // Rompe ambos bucles
        }
    }
}

// Guardar en la base de datos
$stmt = $conn->prepare("INSERT INTO mensajes (mensaje_usuario, respuesta_bot) VALUES (?, ?)");
$stmt->bind_param("ss", $mensaje, $respuesta);
$stmt->execute();

echo $respuesta;
?>
