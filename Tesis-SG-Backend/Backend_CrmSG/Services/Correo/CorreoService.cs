using System.Net.Mail;
using System.Net;

namespace Backend_CrmSG.Services.Correo
{
    public class CorreoService : ICorreoService
    {
        private readonly IConfiguration _configuration;

        public CorreoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<bool> EnviarCorreoValidacion(string correoDestino, string hashValidacion)
        {
            try
            {
                // Lógica básica de envío de correo
                var smtpClient = new SmtpClient(_configuration["Smtp:Host"])
                {
                    Port = int.Parse(_configuration["Smtp:Port"] ?? "587"),
                    Credentials = new NetworkCredential(
                        _configuration["Smtp:User"],
                        _configuration["Smtp:Password"]
                    ),
                    EnableSsl = true
                };

                var urlValidacion = $"{_configuration["App:FrontendUrl"]}/register?token={hashValidacion}";
                var from = _configuration["Smtp:From"];
                if (string.IsNullOrWhiteSpace(from))
                    throw new InvalidOperationException("La dirección 'From' no está configurada en appsettings.");


                var mailMessage = new MailMessage
                {
                    From = new MailAddress(from),
                    Subject = "Validación de correo electrónico",
                    Body = $"<p>Haz clic en el siguiente enlace para validar tu cuenta:</p><p><a href='{urlValidacion}'>Validar cuenta</a></p>",
                    IsBodyHtml = true,
                };

                mailMessage.To.Add(correoDestino);

                await smtpClient.SendMailAsync(mailMessage);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }

}
