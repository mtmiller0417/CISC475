# System Requirements

## Hardware Components
- Computer with Windows 7/8/10, MacOS, Linux Operating Systems

## Software Components
- Google Chrome/Microsoft Edge/Mozilla Firefox/Safari
  - Latest versions preferred
- Visual Studio Code (for program modification)
- NodeJS
- npm (Node Package Manager)
- Accompanying Metadata Files
- Accompanying ECG Scan Files

**Note:** If you have any issues installing any of the above  or accessing the above files, please contact your system administrator if the system is owned by an organization.  If the system is personal, please research the program you wish to install or view the sample files provided in the repository for the correct formatting.

# Operating Instructions

## Downloading
### Method 1:
1. Navigate to https://github.com/mtmiller0417/CISC475

2. Click on the "Clone or Download" Button:
<img src="./instruction images/meth1step2.png">

3. Download and un-zip the file
<img src="./instruction images/meth1step3.png">

### Method 2:
1. Open Git/Terminal on your system and navigate to a        directory where you would like to have the program        file stored
2. Open Git/Terminal on your system and enter the command:

        git clone https://github.com/mtmiller0417/CISC475.git

## Installation
1. Navigate to the file directory
2. Navigate into the "client" file
3. Enter the command:

        npm i
4. After the installation process is completed, enter the command:

        npm start

5. The above command will create a server for you to access in your preferred web browser via: "localhost:3000"
    
## Usage

1. Place all associated ECG Scan Data in the "/client/src/csv_files" folder

2. Place the Patient Information/Metadata file in the "/client/src/components/Metadata" folder

    - **Note:** This is not a mandatory file, this file will simply display the patient data associated with the scan

3. Navigate to/Refresh the localhost link established in the above "Installation" section

4. Select a file from the dropdown menu as specified
<img src="instruction images/usagestep4.png">
    - **Note:** If you do not see any files listed, there is an issue with the files that you have loaded in the csv_files folder, or your files have been loaded in the wrong location

5. View/Modify all associated ECG scans

## ECG Scan Modification

This software contains the functionality to add and remove data from the ECG Scans.  The data is separated in the the 5 types of annotations listed on a typical ECG graph for easy usage.

### Viewing Data
If you would like to view specific data regarding a point on one of the 12 graphs, simply hover over the point or segment of the line on the graph.

### Adding Data
If you would like to add data at a specific location, select the annotation type (P, Q, R, S, T) from the side bar and simply click along the line where you would like that point to be added.

### Removing Data
If you would like to remove data from a specific location, simply click on the point you would like to remove.
