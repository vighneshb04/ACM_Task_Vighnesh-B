# Deploying a Web Application on AWS

## Overview
This guide provides step-by-step instructions for deploying a simple web application on AWS using EC2 for the server, S3 for storage, and Route 53 for DNS management. It also covers setting up IAM roles and policies to secure the application.

## Prerequisites
- An AWS account
- AWS CLI installed and configured
- Basic understanding of AWS services

## Step 1: Launch an EC2 Instance
1. **Log in to the AWS Management Console.**
2. Navigate to **EC2** from the services menu.
3. Click on **Launch Instance**.
4. Choose an Amazon Machine Image (AMI), e.g., Amazon Linux 2023.
5. Select an instance type, e.g., `t2.micro`.
6. Configure instance details (keep defaults or customize as needed).
7. Add storage (default settings are usually sufficient).
8. Configure security group:
   - Allow SSH (port 22) from your IP.
   - Allow HTTP (port 80) from anywhere.
9. Review and launch the instance. Download the key pair (`.pem` file).

## Step 2: Connect to Your EC2 Instance
1. Open **PowerShell** or **Terminal**.
2. Run the following command to connect to your instance:
   ```bash
   ssh -i "C:\path\to\your-key.pem" ec2-user@your-ec2-public-ip
   ```

## Step 3: Install a Web Server
1. Update the package repository:
   ```bash
   sudo yum update -y
   ```
2. Install Apache:
   ```bash
   sudo yum install httpd -y
   ```
3. Start the Apache service:
   ```bash
   sudo systemctl start httpd
   ```
4. Enable Apache to start on boot:
   ```bash
   sudo systemctl enable httpd
   ```

## Step 4: Set Up IAM Roles and Policies
1. **Navigate to IAM**:
   - In the AWS Management Console, search for and select **IAM**.
2. **Create an IAM Role for EC2**:
   - Click on **Roles** > **Create role**.
   - Choose **AWS service** and select **EC2**.
   - Attach the `AmazonS3ReadOnlyAccess` and `AmazonEC2RoleforSSM` policies.
   - Complete the role creation process.
3. **Create a Custom Policy for S3**:
   - In IAM, go to **Policies** > **Create policy**.
   - Use the JSON editor and input the following policy:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": "s3:GetObject",
           "Resource": "arn:aws:s3:::your-bucket-name/*"
         }
       ]
     }
     ```
   - Replace `your-bucket-name` with your actual S3 bucket name.
   - Attach this policy to your IAM role.

## Step 5: Create an S3 Bucket
1. Navigate to **S3** from the services menu.
2. Click on **Create bucket**.
3. Provide a unique bucket name and choose a region.
4. Configure options (defaults are usually fine).
5. Set permissions to allow public access if needed (for static websites).
6. Review and create the bucket.

## Step 6: Upload Static Files to S3
1. Click on your newly created S3 bucket.
2. Click **Upload** and select files from your local machine.
3. Set appropriate permissions for your files.

## Step 7: Configure Route 53 for DNS Management
1. Navigate to **Route 53** from the services menu.
2. Click on **Hosted Zones** > **Create Hosted Zone**.
3. Enter your domain name and create the zone.
4. Note the nameservers provided by Route 53.
5. Update your domain registrar to use these Route 53 nameservers.

## Step 8: Secure Your Application
1. **Configure EC2 Security Group**:
   - Allow inbound traffic on port 80 (HTTP) and port 443 (HTTPS) if using SSL.
2. **Regularly Update Your EC2 Instance**:
   - Run the following command to keep your instance updated:
     ```bash
     sudo yum update -y
     ```
3. **Optional: Set Up HTTPS**:
   - Install SSL with:
     ```bash
     sudo yum install mod_ssl
     ```
   - Restart Apache:
     ```bash
     sudo systemctl restart httpd
     ```

## Step 9: Access Your Application
- Open a web browser and navigate to your public IP or domain name to see your application.

## Conclusion
You have successfully deployed a web application on AWS using EC2, S3, and Route 53. Follow the security best practices outlined to keep your application safe and secure.
