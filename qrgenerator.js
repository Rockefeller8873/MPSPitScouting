import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Hashtable;

public class QRCodeGenerator {

    public static void main(String[] args) {
        // Information to be encoded in the QR code
        String data = "Pit Scouting Form\n"
                    + "Team Number: 1234\n"
                    + "Robot Name: ScouterBot\n"
                    + "Drive Type: Sweve, Tank\n"
                    + "Auton Plan: Drive forward\n"
                    + "Preferred way to score: Algee\n"
                    + "How does your robot pick up Coral: Ground\n"
                    + "Highest Coral level: Level 3\n"
                    + "Height preference: Level 2\n"
                    + "Does your robot shoot Algee: Yes\n"
                    + "Does your robot process Algee: No\n"
                    + "Robot hang: High\n"
                    + "Comments: Works great!";
        
        // File where the QR code will be saved
        String filePath = "scouting_qr.png";

        // Generate the QR code
        try {
            generateQRCode(data, filePath);
            System.out.println("QR Code generated successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void generateQRCode(String data, String filePath) throws WriterException, IOException {
        // Set QR code properties
        int width = 300; // Width of the QR code
        int height = 300; // Height of the QR code

        // Define the QR code encoding hints
        Hashtable<EncodeHintType, String> hintMap = new Hashtable<>();
        hintMap.put(EncodeHintType.CHARACTER_SET, "UTF-8");

        // Create QRCodeWriter instance
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, width, height, hintMap);

        // Convert BitMatrix to BufferedImage
        BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                bufferedImage.setRGB(x, y, (bitMatrix.get(x, y) ? 0x000000 : 0xFFFFFF));
            }
        }

        // Save the image to a file
        File file = new File(filePath);
        ImageIO.write(bufferedImage, "PNG", file);
    }
}
