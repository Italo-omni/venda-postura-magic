
// Função que será acionada quando o deploy for concluído com sucesso
exports.handler = async function(event, context) {
  console.log('Deploy completed successfully');
  
  // Você pode adicionar código aqui para enviar notificações para outros serviços
  // como Slack, Discord, email, etc.
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Deploy notification sent successfully' })
  };
};
