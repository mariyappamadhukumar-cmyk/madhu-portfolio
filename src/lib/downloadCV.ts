import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const downloadCVAsPDF = async () => {
  try {
    // Create a temporary container with the CV content
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 11px; line-height: 1.5; color: #2c3e50;">
        <h1 style="text-align: center; font-size: 24px; margin-bottom: 5px;">MADHU KUMAR M</h1>
        <p style="text-align: center; color: #1a5490; font-size: 13px; margin-bottom: 10px;">AI & Python Developer | Machine Learning | Computer Vision</p>
        <div style="text-align: center; font-size: 11px; margin-bottom: 20px;">
          <p>+91 97914 41235 | madhukumar01271@gmail.com | <a href="https://github.com/MpMadhukumar">GitHub</a> | <a href="https://www.linkedin.com/in/madhu-kumar-mariyappa-286bb5320">LinkedIn</a></p>
        </div>

        <h2 style="font-size: 12px; font-weight: bold; color: #0d2847; border-bottom: 2px solid #1a5490; padding-bottom: 5px; margin-top: 15px; margin-bottom: 10px;">PROFILE</h2>
        <p style="text-align: justify; margin-bottom: 15px;">
          Innovative and goal-driven AI & Python Developer with strong experience in designing intelligent, user-focused applications. Developed cutting-edge projects including AI-powered health diagnosis (Pranava Health AI), gesture-controlled gaming, smart expense trackers (CashClip, Pocket View AI), and voice-driven English learning assistants. Skilled in Kivy, IoT integrations, and MATLAB computer vision. Results-oriented developer with client project experience at Tech Mahindra UK, Wipro UK through Certainti.ai. Passionate about creating accessible AI tools using open-source technologies and delivering seamless user experiences.
        </p>

        <h2 style="font-size: 12px; font-weight: bold; color: #0d2847; border-bottom: 2px solid #1a5490; padding-bottom: 5px; margin-top: 15px; margin-bottom: 10px;">FEATURED PROJECTS</h2>
        
        <h3 style="font-weight: bold; font-size: 11px; color: #0d2847; margin-top: 10px; margin-bottom: 3px;">Pranava Health AI - AI-Powered Health Diagnosis & Doctor Finder</h3>
        <p style="color: #1a5490; font-size: 10px; font-style: italic; margin-bottom: 5px;">Python, Flask, Gemini API, Google Maps API</p>
        <ul style="margin-left: 15px; font-size: 10px;">
          <li>Built intelligent web app that diagnoses diseases from user symptoms using Gemini API and FDA-backed medication data</li>
          <li>Suggests tablets, vaccines, creams with dosage & duration; locates nearby doctors/hospitals via Google Maps API</li>
          <li>Features interactive chat-based interface with voice support and multilingual options</li>
        </ul>

        <h3 style="font-weight: bold; font-size: 11px; color: #0d2847; margin-top: 10px; margin-bottom: 3px;">Gesture-Controlled Racing Game</h3>
        <p style="color: #1a5490; font-size: 10px; font-style: italic; margin-bottom: 5px;">Python, OpenCV, MediaPipe, PyAutoGUI, Speech Recognition</p>
        <ul style="margin-left: 15px; font-size: 10px;">
          <li>Developed car racing game with hand gesture control and voice command integration</li>
          <li>Integrated speech recognition for in-game voice commands</li>
          <li>Added realistic sounds, multiple vehicles, day–night mode, and dynamic obstacles</li>
        </ul>

        <h3 style="font-weight: bold; font-size: 11px; color: #0d2847; margin-top: 10px; margin-bottom: 3px;">CashClip – Smart Expense Tracker</h3>
        <p style="color: #1a5490; font-size: 10px; font-style: italic; margin-bottom: 5px;">Python, Kivy, Node.js, OCR, Google Maps API</p>
        <ul style="margin-left: 15px; font-size: 10px;">
          <li>Created voice-command and OCR-based expense tracker with automatic categorization and budget alerts</li>
          <li>Integrated pie chart visualization, cashback suggestions, shop recommendations</li>
          <li>Designed for mobile and web using Kivy and Node.js</li>
        </ul>

        <h3 style="font-weight: bold; font-size: 11px; color: #0d2847; margin-top: 10px; margin-bottom: 3px;">English Buddy – AI Speaking Assistant</h3>
        <p style="color: #1a5490; font-size: 10px; font-style: italic; margin-bottom: 5px;">Python, Google Gemini API, Speech Recognition</p>
        <ul style="margin-left: 15px; font-size: 10px;">
          <li>Built speech-to-text AI assistant that detects grammatical errors and provides instant corrections</li>
          <li>Integrated Google Gemini API for real-time grammar improvement</li>
          <li>Encourages fluent English conversation through voice-based interaction</li>
        </ul>

        <h2 style="font-size: 12px; font-weight: bold; color: #0d2847; border-bottom: 2px solid #1a5490; padding-bottom: 5px; margin-top: 15px; margin-bottom: 10px;">TECHNICAL SKILLS</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div>
            <strong style="color: #0d2847;">Programming:</strong> Python, JavaScript, Node.js, MATLAB, SQL
          </div>
          <div>
            <strong style="color: #0d2847;">AI Platforms:</strong> Gemini API, OpenAI, ChatGPT, Hugging Face, ComfyUI
          </div>
          <div>
            <strong style="color: #0d2847;">Frameworks:</strong> Flask, Kivy, React.js, Express.js
          </div>
          <div>
            <strong style="color: #0d2847;">Vision & ML:</strong> OpenCV, MediaPipe, PyAutoGUI, NumPy, Scikit-learn
          </div>
          <div>
            <strong style="color: #0d2847;">Cloud:</strong> Firebase, Google Cloud Platform, Git, GitHub, n8n
          </div>
        </div>

        <h2 style="font-size: 12px; font-weight: bold; color: #0d2847; border-bottom: 2px solid #1a5490; padding-bottom: 5px; margin-top: 15px; margin-bottom: 10px;">EDUCATION</h2>
        <p style="font-weight: bold; font-size: 11px; color: #0d2847;">B.E. Computer Science Engineering – AI & Machine Learning</p>
        <p style="font-size: 10px; color: #666;">K.S. Rangasamy College of Technology | 2nd Year (2024-28 Batch) | CGPA: 8.98</p>
        <p style="font-weight: bold; font-size: 11px; color: #0d2847; margin-top: 8px;">12th Grade: 84% | 10th Grade: 72%</p>
      </div>
    `;

    // Append to body temporarily
    document.body.appendChild(element);

    // Convert HTML to canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
    });

    // Remove temporary element
    document.body.removeChild(element);

    // Calculate dimensions for PDF
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add image to PDF with proper scaling
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download PDF
    pdf.save('Madhu_Kumar_M_Resume.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};
