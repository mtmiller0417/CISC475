write-host "`n  ## ANNOTATION LAUNCHER ## `n"


### CONFIGURATION
$WarningPreference = 'SilentlyContinue'

$ZIPFILE = 'Annotations.zip'
$FOLDER_FOR_UNZIP = 'Annotations'


$folder_found = Test-Path $ZIPFILE

# If the zip folder is not found, exit
if(!$folder_found){
    write-host 'ERROR,' $ZIPFILE 'not found'
    write-host "`nEXITING..."
    pause
    exit
}

# IF the folder to put the unzipped files exists, remove it, Expand-Archive remakes it
if(Test-Path $FOLDER_FOR_UNZIP){
    write-host "`n  ## Removing Previous Folder...  ##"
    rm -Recurse -Force -erroraction 'silentlycontinue' $FOLDER_FOR_UNZIP
}

write-host "`n  ## Unzipping File...  ##"
$var = Expand-Archive -Path $ZIPFILE -DestinationPath $FOLDER_FOR_UNZIP

cd $FOLDER_FOR_UNZIP

# Navigate to the right folder
cd CISC475-master\client

# Install the dependencies
#write-host "`n  ## Installing Dependencies...  ##"
npm install
npm audit fix

# Run the program
npm start


# Dont just exit, let them read, then close when they press any button
pause