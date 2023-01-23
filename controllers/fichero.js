const {request, response} = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const allowedFiles = ['.img', '.jpg', '.png', '.gif']

const uploadFile = (req = request, res = response) => {

  // si no tiene propiedades 
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({msg:'No files were uploaded.'});
  }
  
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const {file} = req.files;//file el nombre del parametro del thunder
  
  // para que obtener la extensión del fichero
  const extension = path.extname(file.name); // devuelve con punto

  if(!allowedFiles.includes(extension)){
    return res.status(400).json({msg:'Invalid file extension'});
  } else {

  //para poner el un nombre generado 
  const newFileName = uuidv4(); 
  const newFile = newFileName + extension;

//estos devuelve la extensión sin punto
//opción 1
// sliptName = sampleFile.name.split('.');
// extension = splitName[splitName.length - 1]

//opción 2
//extension = file.name.split('.').pop();

//la ruta del directorio
const uploadPath = path.join( __dirname, '../uploads/', folder, tempName);

  // Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).json({msg:err});
    console.log(newFile)
    res.json({msg: 'File uploaded!'});
  });
}
}

module.exports = {uploadFile}