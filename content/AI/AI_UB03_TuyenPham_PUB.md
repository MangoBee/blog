---
title: Supervised Learning Exercise
date: 2024-05-07
view-count: 1
---

## Setup Dataset for Classification and Regression Model
- After correct the identified errors in *Laborpraktikum_02*, data set is ready for modelling process, which is executed in *Python* with the help of following packets: 
	- Pandas for transforming in Dataframe.
	- Numpy for numerical calculation.
	- Matplotlib/Seaborn for ploting and visualizing.
	- And last but not least, Scikit-learn (or SKlearn) for
	-  Machine Learning.
- In every Machine Learning process, split the data into features and target is essential. Thus two seperate dataframe that assign to two variable from original dataframe is needed. As known in previous work, there are discrete/categorical and continuous feature. The Machine Learning's algorithm we used in this project is KNN and Decision Tree, in which their features required to be in numerical form. Thus categorical data must be numerized. There are several techniques available, here we use One-Hot Encoding. Some identified categorical data in previous session like *Drezahl* and *Bearbeitungszeit* isnt necessary to convert into. Which left *Machine*, *Mode* and *Produkt* as objects of encoding.
- In summary, the follow tasks is needed to program in python before applied Machine Learning:
	- Convert specified columns/features to string.
	- One-hot encoding categorical data.
	- Setup dataframe for features and target.
	- Split the data into features and target.
	- Split the data into training and test sets.

> [!example]- Example of Setup Dataset for supervised learning Classification
> ```python
> """Setup Dataset"""
> 
> # Replace 'your_file.csv' with the actual path or URL to your CSV file
> file_path = '/home/mangobee/Downloads/VSCode_Test/databaseWiSe2023_s0590106_Cleaned.csv'
> 
> # Read the CSV file into a DataFrame
> df = pd.read_csv(file_path)
> 
> # Convert specified columns to string
> columns_to_convert = ['Mode']
> df[columns_to_convert] = df[columns_to_convert].astype(str)
> 
> # One-hot encoding categorical data
> X_encoded = OneHotEncoder().fit_transform(df[["Maschine", "Produkt"]])
> # Convert to dataframe & Rename
> X_encoded = pd.DataFrame(X_encoded.toarray())
> X_encoded = X_encoded.rename(columns={0: 'Maschine A', 1: 'Maschine B', 2: 'Maschine C', 3: 'Maschine D', 4: 'Produkt X', 5: 'Produkt Y'})
> 
> # Extract numerical Features/Sub-dataframe
> df_numeric = df.select_dtypes(include=['int64', 'float64'])
> # Combine encoded categorical features with numeric features
> X_combined = pd.concat([X_encoded, df_numeric], axis=1) 
> 
> # Split the data into features (X) and target (y)
> X = X_combined
> y = df['Mode']
> 
> # Split the data into training and test sets
> X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)
> ```

- Here we used 20% of data as test and for better algorithm performance comparision, same split between the training an testing sets are secured for every run by putting `random_state = 1`.

## Dimensionalität
*Q: Kann die Dimensionalität des Datensatzes bei geringem Informationsverlust reduziert werden? Welche Dimensionalität wird im Training genutzt?*
- Yes, there is two method to achieve this:
	- Properties are removed from the training data set until there is no longer any improvement (or a deterioration) in the result.
	- Multiple properties are combined using their correlation, reducing the number of dimensions required.
- To proof this, PCA is conducted to project's dataset with help of setup in section above.
- We use *Sklearn* to code PCA, several step need to take:
	- Normalize dataframe.
	- Program cumulative PCA with Sklearn and Numpy packets.
	- Visualize Cumulative Principle components.

**Results:**

![](ae22cc653adbe313b069008f43580e4a.png)
*Fig.01 Cummulative Explained Variance vs. Number of Pricipal Components*

- Accoding to this, at least four features can be ignored without information lost.
- In this example, except *Mode* whole features in dataset is used. The numerizing process categorical data yield in total 13 features.

## Classification
*Question:* 
1. *Wählen Sie 2 geeignete Klassifikatoren aus (Vorgabe: verschiedene Verfahren, Genauigkeit <100%)*
2. *Stellen Sie deren Klassifikationsleistung geeignet dar. (2 Pkt)*
3. *Welches Klassifikationsmodell ist besser geeignet und warum ? (2 Pkt)*
- KNN and Decision Tree is chosen.

### k-Nearest Neighbor Classification
- When training a kNN classifier, it's essential to normalize the features. This is because KNN measures the distance between points. Selection of k also effect the quality of model. Lets take some random k for the first run to observe a result.
	- With k = 3 model yield with accuracy of 0.98. This is a pretty good score. However, we may be able to do better by optimizing our value of k with Cross Validation.

#### Cross Validation
- In the code, we use the KNN model on our data with fivefold cross-validation. This means the data is split into five parts, and the model is trained on four of them while testing on the remaining one. The process is repeated for each group, and the average accuracy score helps us identify the best-performing model. After that we plot this in 2D Graph to get a better overview.

![](90529f9a6fd1ee5cee37658eade17b4e.png)
*Fig.02 Cross Validation*

- The graph suggest that for the best result shall be chosen in range from 6 to 13. For better generalisation, k = 13 is picked. After rerun with new k, the accuracy stay the same. 
- For testing purposes, testing with k = 50 result accuracy dropping only 0.97, which show that model quite robust with large k given only 200 rows of data from test set.
> [!example]- Cross Validation Code Snippet
> ```python
> """Using Cross Validation to Get the Best Value of k"""
> 
> # Implement Cross Validation from Sklearn
> k_values = [i for i in range (1,50)]
> scores = []
> 
> scaler = StandardScaler()
> X = scaler.fit_transform(X)
> 
> for k in k_values:
>     knn = KNeighborsClassifier(n_neighbors=k)
>     score = cross_val_score(knn, X, y, cv=5)
>     scores.append(np.mean(score))
> 
> # Plot Results
> plt.plot(k_values, scores, marker='o', label='Accuracy Score')
> plt.xlabel("K Values")
> plt.ylabel("Accuracy Score")
> plt.legend()  # Show legend if you have multiple lines
> ```

#### Classification Evaluation 
- Evaluating Classification model with only accuracy metric can lead to limited decisions, therefore a detailed breakdown by confusion matrix with precision, recall and F1 score will give us a more insight and other aspect of model.
- Luckily, `classifition_report` from Sklearn provides a built in function that contained all above metrics.
> [!example]- KNN Classification Code Snippet
> ```python
> """k-NN"""
> 
> # Scale the features using StandardScaler
> scaler = StandardScaler()
> X_train = scaler.fit_transform(X_train)
> X_test = scaler.transform(X_test)
> 
> # Fitting the Model
> knn = KNeighborsClassifier(n_neighbors=13)
> knn.fit(X_train, y_train)
> 
> y_pred = knn.predict(X_test)
> 
> """Evaluating the Supervised Multiclass Classification Model"""
> # Generate the confusion matrix
> cm = confusion_matrix(y_test, y_pred)
> class_labels = ["Mode 1", "Mode 2", "Mode 3"]
> 
> # Create a Confusion Matrix
> plt.figure(figsize=(8, 8))
> sns.heatmap(cm, annot=True, fmt='d', cmap='Greens', xticklabels=class_labels, yticklabels=class_labels)
> plt.title('Confusion Matrix')
> plt.ylabel('True label')
> plt.xlabel('Predicted label')
> plt.show()
> 
> # Classification Report from SKlearn
> report = classification_report(y_test, y_pred)
> print(report)
> ```

**Result:**
For k = 13

![](6fa692ca7297fd64a2c2034eb85552ff.png)
*Fig.03 Confusion Matrix*

|  | precision | recall | f1-score | support |
| ---- | ---- | ---- | ---- | ---- |
| Mode 1 | 1.00 | 0.98 | 0.99 | 65 |
| Mode 2 | 0.99 | 0.98 | 0.98 | 99 |
| Mode 3 | 0.95 | 1.00 | 0.97 | 36 |
| macro avg. | 0.98 | 0.99 | 0.98 | 200 |
| weighted avg. | 0.99 | 0.98 | 0.99 | 200 |

- Accuracy: 0.98.
- According to confusion matrix, only three errors in total and overall three metric have pretty much high score without much deviation from accuracy score. Here support shows us how many true results in each mode is distributed in this test sets of 200.

### Decision Tree Classification
- The procedure in decision tree is similar to KNN, except that we dont need normalizing step cause it is not sensitive to the scale of the input features because they make decisions based on threshold values for individual features.
- In *Sklearn*, Decision Tree's function in default can be run without parsing any arguments, unlike KNN. Which will in the end results in unpruned Decision Tree and when visualizes, its hard for human to interpret.
- To control this, argument `max_dept` use to control how many level of branch will be created, these process is called pre-pruning.
- Another important parameter for optimization is the `criterion`. It is an option that allows you to specify the criterion used for choosing attribute splits in the decision tree. The criterion is essentially a measure of the impurity or quality of a split. The two commonly used criteria are "gini" and "entropy."
- `criterion = entropy` is chosen for making splits that result in more homogenous child nodes.

> [!example]- Decision Tree Code Snippet
> ```python
> """Decision Tree"""
> 
> # Fitting the Model
> clf = DecisionTreeClassifier(criterion="entropy", max_depth=3) 
> clf = clf.fit(X_train,y_train)
> 
> y_pred = clf.predict(X_test)
> 
> 
> """Evaluating the Supervised Multiclass Classification Model"""
> # Generate the confusion matrix
> cm = confusion_matrix(y_test, y_pred)
> class_labels = ["Mode 1", "Mode 2", "Mode 3"]
> 
> # Create a Confusion Matrix
> plt.figure(figsize=(8, 8))
> sns.heatmap(cm, annot=True, fmt='d', cmap='Greens', xticklabels=class_labels, yticklabels=class_labels)
> plt.title('Confusion Matrix')
> plt.ylabel('True label')
> plt.xlabel('Predicted label')
> plt.show()
> 
> # Classification Report from SKlearn
> report = classification_report(y_test, y_pred)
> print(report)
> 
> # Visualizing Decision Trees
> dot_data = StringIO()
> export_graphviz(clf, out_file=dot_data,  
>                 filled=True, rounded=True,
>                 special_characters=True,feature_names = X.columns,class_names=['1', '2', '3'])
> graph = pydotplus.graph_from_dot_data(dot_data.getvalue())  
> #graph.write_png('Classification_DecisionTree.png')
> Image(graph.create_png())
> ```

**Results without pre-pruning:**

![](fb82319975a3f4d97219dadf48a8f35a.png)
*Fig.04 Decision Tree without Pre-pruning*

![](c16173ff963e4790061b28d42fde97c8.png)
*Fig.05 Confusion Matrix*

|  | precision | recall | f1-score | support |
| ---- | ---- | ---- | ---- | ---- |
| Mode 1 | 1.00 | 0.98 | 0.99 | 65 |
| Mode 2 | 0.99 | 0.97 | 0.98 | 99 |
| Mode 3 | 0.92 | 1.00 | 0.96 | 36 |
| macro avg. | 0.97 | 0.98 | 0.98 | 200 |
| weighted avg. | 0.98 | 0.98 | 0.98 | 200 |
Accuracy: 0.98

**Results with pre-pruning:**

![](f7ac85eb7a64d83925b73dde35ee474d.png)
*Fig.06 Decision Tree with Pre-pruning*

![](cb1b9b0e3d7c047b4759898bd91d3623.png)
*Fig.07 Confusion Matrix*

|  | precision | recall | f1-score | support |
| ---- | ---- | ---- | ---- | ---- |
| Mode 1 | 1.00 | 0.98 | 0.99 | 65 |
| Mode 2 | 0.99 | 0.98 | 0.98 | 99 |
| Mode 3 | 0.95 | 1.00 | 0.97 | 36 |
| macro avg. | 0.98 | 0.99 | 0.98 | 200 |
| weighted avg. | 0.99 | 0.98 | 0.99 | 200 |
Accuracy: 0.98

### Intepretation
- The performance of pruned and unpruned machine learning process arent much different, however, the decision tree is much easier to explain. 
- In term of classification, both KNN and Decision Tree perform pretty well and quite the same. So the chosen process is come down to the characteristic of each algorithm itself.
![](7f6b2f2254d54f4d40b1cd1f37e0e008.png)
*Fig.08 Qualitative assessment of the algorithms with regard to classification and training time as well as generalization. (@matzkaKunstlicheIntelligenzIngenieurwissenschaften2021)*

- Base on this evaluation in lecture script. Given that classification time and training time doesnt matter in this project since the code run in a single of click without any delays. KNN is chosen because of better generalisation.

## Regression
*Question:* 
- *Trainieren Sie mehrere Regressionsmodelle, um die aktuelle Werkzeugtemperatur als Soft-Sensor zu bestimmen. Wählen Sie 2*
- *geeignete Modelle aus (Vorgabe: verschiedene Verfahren).*
- *Stellen Sie deren Regressionsleistung beide Modelle geeignet dar. (3 Pkt)*
- *Welches Regressionsmodell ist besser geeignet und warum ? (2 Pkt)*

- Chosen regression model: KNN and Decision Tree.
- While the overall process is similar to classification, there are a few key differences
	- Target Variable Type:
	    - For classification, the target variable is categorical, representing classes.
	    - For regression, the target variable is continuous, representing a numerical value.
	- Evaluation Metrics:
	    - Classification typically uses metrics like accuracy, precision, recall, and F1-score.
	    - Regression uses metrics like mean squared error (MSE), mean absolute error (MAE), and R-squared.
	- Model Initialization:
	    - For classification, you use KNeighborsClassifier/DecisionTreeClassifier.
	    - For regression, you use KNeighborsRegressor/DecisionTreeRegressor.
	- Output Interpretation:
	    - Classification outputs class labels.
	    - Regression outputs numerical predictions.

### KNN Regression
- Target value is now *Temp Werkzeug* and the rest is convert to features in dataframe format.

![](e820aa88d040d595b7ec84373e86b9cf.png)
*Fig.09 KNN Regression: Mean Squared Error vs. k-number*

- As cross validation for Mean Square Error (MSE) show, larger k worsen MSE. We want to keep MSE as small as possible. So therefore, k should be around 5 to 8.
- Beside MSE, we code Mean Absolute Error (MAE), Root Mean Squared Error (RMSE) for comparision with MSE. For better understanding the scale of error, relative Mean Absolute Error (MAPE) is programed and R2 Score for quality comparision between algorithm.
> [!example]- KNN Regression Code Snippet
> ```python
> """k-NN Regression"""
> 
> # Scale the features using StandardScaler
> scaler = StandardScaler()
> X_train = scaler.fit_transform(X_train)
> X_test = scaler.transform(X_test)
> 
> # Fitting the Model
> knn = KNeighborsRegressor(n_neighbors=5)
> knn.fit(X_train, y_train)
> 
> y_pred = knn.predict(X_test)
> 
> """Evaluating the Supervised Regression Model"""
> 
> # Regression Metrics
> mae = mean_absolute_error(y_test, y_pred)
> mape = relative_mae(y_test, y_pred)
> mse = mean_squared_error(y_test, y_pred)
> rmse = np.sqrt(mean_squared_error(y_test, y_pred))
> r2 = r2_score(y_test, y_pred)
> 
> print(f"Mean Absolute Error (MAE): {mae}")
> print(f"Relative Mean Absolute Error (MAPE): {mape}%")
> print(f"Mean Squared Error (MSE): {mse}")
> print(f"Root Mean Squared Error (RMSE): {rmse}")
> print(f"R-squared (R2 Score): {r2}")
> 
> 
> """Using Cross Validation to Get the Best Value of k"""
> 
> # Define a range of k values to explore
> k_values = range(1, 50)  # Adjust the range as needed
> 
> # Initialize lists to store mean squared errors for each k
> mse_scores = []
> 
> # Loop through different values of k and perform cross-validation
> for k in k_values:
>     knn_regressor = KNeighborsRegressor(n_neighbors=k)
>     cv_scores = cross_val_score(knn_regressor, X_train, y_train, cv=5, scoring='neg_mean_squared_error')
>     mse_scores.append(-np.mean(cv_scores))
> 
> # Plot the mean squared error for each k
> plt.plot(k_values, mse_scores, marker='o')
> plt.title('KNN Regression: Mean Squared Error vs. Number of Neighbors (k)')
> plt.xlabel('Number of Neighbors (k)')
> plt.ylabel('Mean Squared Error')
> plt.show()
> ```

**Result:**
For k = 5
- MAE: 1.2691
- MSE: 2.8585
- RMSE: 1.6907
- MAPE: 1.3448%
- R2 Score: 0.9624
### Decision Tree Regression
- Chosen criterion: `square_error`
- Pre-pruning: `max_dept = 3`
> [!example]- Decision Tree Code Snippet
> ```python
> """Decision Tree Regression"""
> 
> # Fitting the Model
> clf = DecisionTreeRegressor(criterion='squared_error', max_depth=3) 
> clf = clf.fit(X_train,y_train)
> 
> y_pred = clf.predict(X_test)
> 
> 
> """Evaluating the Supervised Regression Model"""
> # Regression Metrics
> mae = mean_absolute_error(y_test, y_pred)
> mape = relative_mae(y_test, y_pred)
> mse = mean_squared_error(y_test, y_pred)
> rmse = np.sqrt(mean_squared_error(y_test, y_pred))
> r2 = r2_score(y_test, y_pred)
> 
> print(f"Mean Absolute Error (MAE): {mae}")
> print(f"Relative Mean Absolute Error (MAPE): {mape}%")
> print(f"Mean Squared Error (MSE): {mse}")
> print(f"Root Mean Squared Error (RMSE): {rmse}")
> print(f"R-squared (R2 Score): {r2}")
> 
> # Visualizing Decision Trees
> dot_data = StringIO()
> export_graphviz(clf, out_file=dot_data,  
>                 filled=True, rounded=True,
>                 special_characters=True,feature_names = X.columns,class_names=['1', '2', '3'])
> graph = pydotplus.graph_from_dot_data(dot_data.getvalue())  
> #graph.write_png('Regression_DecisionTree.png')
> Image(graph.create_png())
> ```

**Result:**

![](ae0ab6253f73f564db801502cb657b12.png)
*Fig.10 Pruned Decision Tree Regression*

- MAE: 1.2600
- MSE: 2.4477
- RMSE: 1.5645
- MAPE: 1.3492%
- R2 Score: 0.9678
### Intepretation
Overall, Decision Tree Regression have higher score in any mentioned metrics which make it a better performer in this specific task.